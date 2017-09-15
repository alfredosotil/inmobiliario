import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { asEnumerable } from 'linq-es2015';
import { PropertyService } from '../../services/property.service';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
//import { RatingComponent } from 'ngx-bootstrap';
declare var jQuery: any;
declare var Ladda: any;

@Component({
    selector: 'app-registerproperty',
    templateUrl: './registerproperty.component.html',
    styleUrls: ['./registerproperty.component.css']
})

export class RegisterpropertyComponent implements OnInit {

    @ViewChild("search")
    public searchElementRef: ElementRef;
    private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private message = {};
    private messages = [];
    private model = {};
    private listPropertyType = [];
    private listPropertyState = [];
    private listDetailsProperty = [];
    private markerposition = [];
    public overStar: number;
    public percent: number;
    public detailsgroups = [];
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    constructor(
        private ps: PropertyService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private localStorageService: LocalStorageService
    ) {
        this.messages = [
            { text: 'Enviando Informacion', icon: 'glyphicon glyphicon-refresh glyphicon-spin' },
            { text: 'Completado', icon: 'glyphicon glyphicon-ok' },
            { text: 'Error', icon: 'glyphicon glyphicon-remove' },
        ];
    }

    ngOnInit() {
        this.zoom = 4;
        this.latitude = -12.0463730;
        this.longitude = -77.0427540;

        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        this.setCurrentPosition();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });

        this.getListPropertyType();
        this.getListPropertyState();
        this.getListDetailsProperty();
        //        console.log(this.listPropertyType);
        setTimeout(() => {
            jQuery('.selectpicker').selectpicker();
            jQuery('.datepickerjs').datepicker({
                format: 'yyyy/mm/dd',
                language: "es",
                autoclose: true,
                todayHighlight: true
            });
            //            jQuery(".touchspin").TouchSpin({
            //                buttondown_class: "btn blue",
            //                buttonup_class: "btn red"
            //            });
            jQuery(".ionslider").ionRangeSlider({
                grid: !0,
                from: 5,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                onStart: (data) => {
                    this.model["priority"] = data.from_value;
                },
                onChange: (data) => {
                    this.model["priority"] = data.from_value;
                },
                onFinish: (data) => {
                    this.model["priority"] = data.from_value;
                }
            });
            //            jQuery(".wysihtml5").wysihtml5({stylesheets: false});
            jQuery(".maxlength").maxlength({
                limitReachedClass: "label label-danger",
                alwaysShow: !0
            });
            //            jQuery(".mt-ladda-btn").ladda();
            this.setDetailsGroups();
            this.initFormValidation();
        }, 1000);
    }

    private getDetailsPropertyChecked() {
        let checkboxes = [];
        jQuery(".detailsproperty:checkbox:checked").each(function() {
            checkboxes.push(jQuery(this).val());
        });
        return checkboxes;
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }


    private getListPropertyType() {
        this.ps.listPropertyType().subscribe(
            data => this.listPropertyType = data,
            error => alert(error),
            //            () => console.log(this.listPropertyType),
        );
    }

    private getListPropertyState() {
        this.ps.listPropertyState().subscribe(
            data => this.listPropertyState = data,
            error => alert(error),
            //            () => console.log(this.listPropertyState),
        );
    }

    private getListDetailsProperty() {
        this.ps.listDetailsProperty().subscribe(
            data => this.listDetailsProperty = data,
            error => alert(error),
            //            () => console.log(this.listDetailsProperty),
        );
    }

    private getImgsProperty() {
        let arrayImages = JSON.parse(String(this.localStorageService.get("arrayImages")));
        return arrayImages;
    }

    private setDetailsGroups() {
        //        console.log(this.listDetailsProperty)
        this.detailsgroups = asEnumerable(this.listDetailsProperty)
            .Select((option, index) => { return { option, index }; })
            .GroupBy(
            x => Math.floor(x.index / 3),
            x => x.option,
            (key, options) => asEnumerable(options).ToArray()
            )
            .ToArray();
    }

    private onMapReady(map) {
        console.log('map ready', map);
    }

    private onIdle(event) {
        //        console.log('map idle', event.target);
    }

    private onMarkerInit(marker) {
        console.log('marker init', marker);
    }

    private markerDraged($event: any) {
        //        console.log('object ', event);
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.model['latitude'] = String(this.latitude);
        this.model['longitude'] = String(this.longitude);
        this.getAddressLatLng(this.latitude, this.longitude);
        this.validateInputForMap();
    }

    private mapClicked($event: any) {
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.model['latitude'] = String(this.latitude);
        this.model['longitude'] = String(this.longitude);
        this.getAddressLatLng(this.latitude, this.longitude);
        this.validateInputForMap();
    }

    private getAddressLatLng(lat, lng) {
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({
            'location': latlng
        }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    console.log('', results[1].formatted_address);
                    this.model['address'] = results[1].formatted_address;
                } else {
                    this.model['address'] = 'No se encontro resultados';
                }
            } else {
                this.model['address'] = 'Geocoder failed due to: ' + status;
            }
        });
    }

    public InitNewPropertyValidation(e) {
        e.preventDefault();
        Ladda.create(document.querySelector('.mt-ladda-btn')).start();
        console.log("model ", this.model);
        setTimeout(() => {
            jQuery('#new-property-registration-form').data('bootstrapValidator').validate();
        }, 4000);
    }

    private validateInputForMap() {
        setTimeout(() => {
            jQuery('#new-property-registration-form').bootstrapValidator('revalidateField', 'address');
            jQuery('#new-property-registration-form').bootstrapValidator('revalidateField', 'latitude');
            jQuery('#new-property-registration-form').bootstrapValidator('revalidateField', 'longitude');
        }, 500);
    }

    private initFormValidation() {
        jQuery('#new-property-registration-form').bootstrapValidator({
            message: 'El valor no es correcto',
            //            feedbackIcons: {
            //                valid: 'glyphicon glyphicon-ok',
            //                invalid: 'glyphicon glyphicon-remove',
            //                validating: 'glyphicon glyphicon-refresh'
            //            },
            feedbackIcons: 'false',
            onError: (e) => {
                console.log('error')
                Ladda.create(document.querySelector('.mt-ladda-btn')).stop();
            },
            onSuccess: (e) => {
                e.preventDefault();
                Ladda.create(document.querySelector('.mt-ladda-btn')).stop();
                this.registerProperty(this.model);
            },
            fields: {
                propertytype: {
                    validators: {
                        notEmpty: {
                            message: 'Debes escoger un tipo de propiedad.'
                        }
                    }
                },
                propertystate: {
                    validators: {
                        notEmpty: {
                            message: 'Debes escoger un tipo de estado.'
                        }
                    }
                },
                price: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'Debes colocar un monto para esta propiedad.'
                        },
                        integer: {
                            message: 'Debes colocar solo números.'
                        }
                    }
                },
                money: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'Debes seleccionar un tipo de moneda.'
                        }
                    }
                },
                comission: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'Debes colocar una comision para esta propiedad.'
                        },
                        integer: {
                            message: 'Debes colocar solo números.'
                        }
                    }
                },
                area: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'Debes colocar una area para esta propiedad.'
                        },
                        integer: {
                            message: 'Debes colocar solo números.'
                        }
                    }
                },
                date_start: {
                    feedbackIcons: 'false',
                    validators: {
                        notEmpty: {
                            message: 'La fecha de inicio es requerida y no puede ser vacía.'
                        },
                        date: {
                            format: 'YYYY/MM/DD',
                            message: 'El valor no es válido.'
                        }
                    },
                },
                owner: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'El nombre es requerido y no puede ser vacío.'
                        }
                    }
                },
                owner_email: {
                    validators: {
                        notEmpty: {
                            message: 'El correo es requerido y no puede ser vacio'
                        },
                        emailAddress: {
                            message: 'Este no es un correo valido'
                        },
                    }
                },
                owner_phone: {
                    validators: {
                        notEmpty: {
                            message: 'El teléfono es requerido y no puede ser vacio'
                        },
                        regexp: {
                            regexp: '^([2-9])(\\d{2})(-?|\\040?)(\\d{4})( ?|\\040?)(\\d{1,4}?|\\040?)$',
                            message: 'El Teléfono debe contener números unicamente.'
                        }
                    }
                },
                description: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'La descripcion es requerida y no puede ser vacía.'
                        },
                        stringLength: {
                            min: 20,
                            max: 1000,
                            message: 'La descripcion debe ser entre 20 y 1000 caracteres.'
                        }
                    }
                },
                latitude: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'La latitud es requerida, selecciona en el mapa.'
                        }
                    }
                },
                longitude: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'La longitud es requerida, selecciona en el mapa.'
                        }
                    }
                },
                address: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'La dirección es requerida, selecciona en el mapa.'
                        }
                    }
                },
                references: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'La referencia es requerida y no puede ser vacía.'
                        },
                        stringLength: {
                            min: 20,
                            max: 500,
                            message: 'La referencia debe ser entre 20 y 500 caracteres.'
                        }
                    }
                }
            }
        });
        jQuery('.datepickerjs').on('changeDate show', (e) => {
            jQuery('#new-property-registration-form').bootstrapValidator('revalidateField', 'date_start');
            this.model['date_start'] = e.format();
        });
    }

    private registerProperty(o: {}) {
        var x: any;
        jQuery('#processing-modal').modal('show');
        this.message = this.messages[0];
        this.ps.create(o)
            .subscribe(
            data => x = data,
            error => alert(error),
            () => {
                if (parseInt(x.id) > 0) {
                    //                    jQuery('.ui.form').form('clear');
                    let propertyId = x.id;
                    this.ps.createDetailsProperty({ property: propertyId, details: this.getDetailsPropertyChecked() })
                        .subscribe(data => x = data, error => alert(error), () => { console.log(x) });
                    this.ps.createImgProperty({ property: propertyId, imgs: this.getImgsProperty() })
                        .subscribe(data => x = data, error => alert(error), () => { console.log(x) });
                    Ladda.create(document.querySelector('.mt-ladda-btn')).stop();
                    this.localStorageService.remove('arrayImages');
                    this.message = this.messages[1];
                    setTimeout(function() {
                        jQuery('#processing-modal').modal('hide');
                    }, 1500);
                    setTimeout(() => {
                        jQuery('#new-property-registration-form')
                            .bootstrapValidator('disableSubmitButtons', false)  // Enable the submit buttons
                            .bootstrapValidator('resetForm', true);             // Reset the form
                    }, 1500);
                } else {
                    this.message = this.messages[2];
                    setTimeout(function() {
                        jQuery('#processing-modal').modal('hide');
                    }, 1500);
                }
            }
            );
    }

    private testing() {
        let x: any;
        this.ps.createDetailsProperty({ 'property': 1, 'details': [1, 2, 3] })
            .subscribe(data => x = data, error => alert(error), () => { console.log(x) });
    }

}

