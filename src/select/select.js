(function () {
    Polymer({
        publish: {
            value: -1,
            options: null,
            focused: {
                value: false,
                reflect: true
            },
        },

        observe: {
            value: 'updateValueName',
        },

        created: function () {
            this.showMenu = false;
        },

        ready: function () {
            this.$.focus.tabIndex = EditorUI.getParentTabIndex(this)+1;
        },

        clickAction: function (event) {
            var bodyHeight = document.body.scrollHeight;
            var bodytop = this.getBoundingClientRect().top;
            var borderHeight = this.$.border.getBoundingClientRect().height;
            if ( bodyHeight - bodytop <= this.$.menu.scrollHeight + borderHeight + 4 + 10 ) {
                this.$.menu.style.marginTop=-(this.$.menu.scrollHeight + borderHeight + 4 );
            }

            this.showMenu = !this.showMenu;
            this.$.focus.focus();
            event.stopPropagation();
        },

        focusAction: function (event) {
            this.focused = true;
        },

        blurAction: function (event) {
            if ( this.focused === false )
                return;

            if ( EditorUI.find( this.shadowRoot, event.relatedTarget ) )
                return;

            this.showMenu = false;
            this.focused = false;
        },

        keyDownAction: function (event) {
            switch ( event.which ) {
                // esc
                case 27:
                    this.$.focus.blur();
                    event.stopPropagation();
                break;
            }
        },

        selectAction: function (event, detail, sender) {
            var idx = parseInt(sender.getAttribute('index'));
            var entry = this.options[idx];
            if ( this.value !== entry.value ) {
                this.value = entry.value;
                this.fire('changed');
            }
            this.showMenu = false;

            event.stopPropagation();
        },

        updateValueName: function () {
            if ( this.value == -1 )
                return;

            for ( var i = 0; i < this.options.length; ++i ) {
                var entry = this.options[i];
                if ( entry.value === this.value ) {
                    this.valueName = entry.name;
                    break;
                }
            }
        },
    });
})();
