requirejs.config({

    paths: {

        angular: "bower_components/angular/angular",
        uirouter: "bower_components/angular-ui-router/release/angular-ui-router",
        uiapp: "uiapp",
        appCtrl: "appCtrl"

    },

    shim: {

        'uirouter': ['angular'],
        'uiapp': ['angular', 'uirouter'],
        'appCtrl': ['angular', 'uirouter', 'uiapp']
    }
});

