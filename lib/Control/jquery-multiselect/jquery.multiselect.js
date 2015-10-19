/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, boss:true, undef:true, curly:true, browser:true, jquery:true */
/*
 * jQuery MultiSelect UI Widget 1.14pre
 * Copyright (c) 2012 Eric Hynds
 *
 * http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/
 *
 * Depends:
 *   - jQuery 1.4.2+
 *   - jQuery UI 1.8 widget factory
 *
 * Optional:
 *   - jQuery UI effects
 *   - jQuery UI position utility
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
(function ($, undefined) {
    var multiselectID = 0;
    var $doc = $(document);

    $.widget("ech.multiselect", {

        // default options
        options: {
            header: true,
            height: 175,
            minWidth: 225,
            classes: '',
            checkAllText: '全选',
            uncheckAllText: '清除',
            //noneSelectedText: 'Select options',
            noneSelectedText: '请选择…',
            selectedText: '# selected',
            selectedList: 0,
            show: null,
            hide: null,
            autoOpen: false,
            multiple: true,
            position: {},
            widthT: 225,
            //内容：是否显示搜索框
            //作者：Sam.Wang
            //修改时间：2014-11-20
            //-----------------------Start-----------------------
            showSearchBar: true
            //-----------------------End-----------------------
        },

        _create: function () {
            var fieldclassStr = this.element.attr("class");
            //var fieldclasses = fieldclassStr.split(' ');
            //for (var i = 0; i < fieldclasses.length; i++) {
            //    if (fieldclasses[i].indexOf("span") != -1) {
            //        this.fieldClassWidth = fieldclasses[i];
            //    }

            //}
            var el = this.element.hide();
            var o = this.options;

            this.speed = $.fx.speeds._default; // default speed for effects
            this._isOpen = false; // assume no

            // create a unique namespace for events that the widget
            // factory cannot unbind automatically. Use eventNamespace if on
            // jQuery UI 1.9+, and otherwise fallback to a custom string.
            this._namespaceID = this.eventNamespace || ('multiselect' + multiselectID);

            var button = (this.button = $('<button type="button" class="' + fieldclassStr + '"><span class="ui-icon ui-icon-triangle-2-n-s"></span></button>'))
              .addClass('ui-multiselect ui-widget ui-state-default ui-corner-all')
              .addClass(o.classes)
              //.addClass(this.fieldClassWidth)
              .attr({ 'title': el.attr('title'), 'aria-haspopup': true, 'tabIndex': el.attr('tabIndex') })
              .insertAfter(el)
              .css("margin-left", "0"),

              buttonlabel = (this.buttonlabel = $('<span />'))
                //.html(o.noneSelectedText).css('color','#999')
                .html(o.noneSelectedText).css({
                    color: '#999', overflow: 'hidden', 'text-overflow': 'ellipsis'
                    , display: 'block', 'white-space': 'nowrap'
                })
                .appendTo(button),

              menu = (this.menu = $('<div />'))
                .addClass('ui-multiselect-menu ui-widget ui-widget-content ui-corner-all')
                .addClass(o.classes)
                //.addClass(this.fieldClassWidth)
                //.css("margin-left", "0")
                .appendTo(document.body),


              header = (this.header = $('<div />'))
                .addClass('ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix')
                .appendTo(menu),

                //多选插件增加搜索功能。by neil.yao
              searchFn = (this.searchFn = $('<input type="text"/>'))
                    .css({
                        'width': '100%',
                        'padding': '0',
                        'background': '#fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAlCAYAAAAN8srVAAACTUlEQVR42u3Wv2sTcRiA8VPBxUKwEAxU3NxPIoFAl1bIkkmwYKAKRbqbRSWQCGJ+rMUibjo4FARBl0AgUIh/QXFxFIpKJHAQKA56r0/hDbyEK5VrDH2hBx+ud+Ga9+G+uSQQkVOv0+lMZNBFHoFRwABZb0F9CCITVdRjQd9b0CoOTNSGiRkidBWkljGGINb9CCECd0FqE7GJqkxeMxccK8UbJzppUPGIO5SfR9DCjINsTIR1RDbKXvAakuB9yqAsvuLaDIN6Jqag5/IaIxjYCxaxDzFGyKUMegdBb4ZBGfQmMUaIXeSmLyhDjHspl9wdiPHgJEGlUumf2UGml96HlJ+hRQwhRoSleQfZgfawlDJoB5KgO4OgDLrIT4UUMEA2xdNpro/t6aA+BJGJKuqxoJ9ikLmzQas4MFEbJmYIHz99GNRaxhiCWPcjhAjcBalNxCaqgsBrUPGIO5T3GGRjIqwjslHegnompqDn8hojGHgLyqA3iTFC7CLnLOh4Z0Gn3FnQf2O3ZrN5iZ9aVw81Go3zQfLmI4iIx/gBUXvtdnvNXZDGbEMI2Gf/BFsQPXffVRADr+jgn1hylwPdOL6Bn7w2brVaV9wEMfALBheGDu3QGvVQ79RtT0FvGDyu1WoXE4JWNKjiack916HXEoJecT7GLTdBLLXrDPwbEX+Xq9XqucPHNzFVzv3B93q9fsHbU+4uhAhh/wXfIMaWqyBdXjfxluE/63fQM/Yt8/je9hQ0vdnQpybqJRZcB2nUI4J+QVB2H6RRHzUoTPo/fwGr9gNcek8bXAAAAABJRU5ErkJggg==") no-repeat 100% -20px',
                        'margin': '1px 0',
                        'outline': '0',
                        'border': '1px solid #d0d0d0',
                        'font-family': 'sans-serif',
                        'font-size': '1em'
                    }).appendTo(menu);

            headerLinkContainer = (this.headerLinkContainer = $('<ul />'))
              .addClass('ui-helper-reset')
              .html(function () {
                  if (o.header === true) {
                      return '<li><a class="ui-multiselect-all" href="#"><span class="ui-icon ui-icon-check"></span><span>' + o.checkAllText + '</span></a></li><li><a class="ui-multiselect-none" href="#"><span class="ui-icon ui-icon-trash"></span><span>' + o.uncheckAllText + '</span></a></li>';
                  } else if (typeof o.header === "string") {
                      return '<li>' + o.header + '</li>';
                  } else {
                      return '';
                  }
              }).append('<li class="ui-multiselect-close"><a href="#" class="ui-multiselect-close"><span class="ui-icon ui-icon-circle-close"></span></a></li>').appendTo(header),

            checkboxContainer = (this.checkboxContainer = $('<ul />'))
              .addClass('ui-multiselect-checkboxes ui-helper-reset')
              .appendTo(menu);

            // perform event bindings
            this._bindEvents();

            // build menu
            this.refresh(true);

            // some addl. logic for single selects
            if (!o.multiple) {
                menu.addClass('ui-multiselect-single');
            }

            // bump unique ID
            multiselectID++;
        },

        _init: function () {
            if (this.options.header === false) {
                this.header.hide();
            }
            if (!this.options.multiple) {
                this.headerLinkContainer.find('.ui-multiselect-all, .ui-multiselect-none').hide();
            }
            if (this.options.autoOpen) {
                this.open();
            }
            //内容：是否显示搜索框
            //作者：Sam.Wang
            //修改时间：2014-11-20
            //-----------------------Start-----------------------
            if (!this.options.showSearchBar) {
                this.searchFn.hide();
            }
            //-----------------------End-----------------------
            if (this.element.is(':disabled')) {
                this.disable();
            }
            else {
                this.enable(); // xzye supplement
            }
        },

        refresh: function (init) {
            var el = this.element;
            var o = this.options;
            var menu = this.menu;
            var checkboxContainer = this.checkboxContainer;
            var optgroups = [];
            var html = "";
            var id = el.attr('id') || multiselectID++; // unique ID for the label & option tags

            // build items
            el.find('option').each(function (i) {
                var $this = $(this);
                var parent = this.parentNode;
                var title = this.innerHTML;
                var description = this.title;
                var value = this.value;
                var inputID = 'ui-multiselect-' + (this.id || id + '-option-' + i);
                var isDisabled = this.disabled;
                var isSelected = this.selected;
                var labelClasses = ['ui-corner-all'];
                var liClasses = (isDisabled ? 'ui-multiselect-disabled ' : ' ') + this.className;
                var optLabel;

                // is this an optgroup?
                if (parent.tagName === 'OPTGROUP') {
                    optLabel = parent.getAttribute('label');

                    // has this optgroup been added already?
                    if ($.inArray(optLabel, optgroups) === -1) {
                        html += '<li class="ui-multiselect-optgroup-label ' + parent.className + '"><a href="#">' + optLabel + '</a></li>';
                        optgroups.push(optLabel);
                    }
                }

                if (isDisabled) {
                    labelClasses.push('ui-state-disabled');
                }

                // browsers automatically select the first option
                // by default with single selects
                if (isSelected && !o.multiple) {
                    labelClasses.push('ui-state-active');
                }

                html += '<li class="' + liClasses + '">';

                // create the label
                html += '<label for="' + inputID + '" title="' + description + '" class="' + labelClasses.join(' ') + '">';
                html += '<input id="' + inputID + '" name="multiselect_' + id + '" type="' + (o.multiple ? "checkbox" : "radio") + '" value="' + value + '" title="' + title + '"';

                // pre-selected?
                if (isSelected) {
                    html += ' checked="checked"';
                    html += ' aria-selected="true"';
                }

                // disabled?
                if (isDisabled) {
                    html += ' disabled="disabled"';
                    html += ' aria-disabled="true"';
                }

                // add the title and close everything off
                html += ' /><span>' + title + '</span></label></li>';
            });

            // insert into the DOM
            checkboxContainer.html(html);

            // cache some moar useful elements
            this.labels = menu.find('label');
            this.inputs = this.labels.children('input');

            // set widths
            this._setButtonWidth();
            this._setMenuWidth();

            // remember default value
            this.button[0].defaultValue = this.update();

            // broadcast refresh event; useful for widgets
            if (!init) {
                this._trigger('refresh');
            }
        },

        // updates the button text. call refresh() to rebuild
        update: function () {
            var o = this.options;
            var $inputs = this.inputs;
            var $checked = $inputs.filter(':checked');
            var numChecked = $checked.length;
            var value;

            if (numChecked === 0) {
                value = o.noneSelectedText;
            } else {
                if ($.isFunction(o.selectedText)) {
                    value = o.selectedText.call(this, numChecked, $inputs.length, $checked.get());
                } else if (/\d/.test(o.selectedList) && o.selectedList > 0 && numChecked <= o.selectedList) {
                    value = $checked.map(function () { return $(this).next().html(); }).get().join(', ');
                } else {

                    //value = o.selectedText.replace('#', numChecked).replace('#', $inputs.length);
                    var selectvalue = '';
                    for (var i = 0; i < numChecked; i++) {
                        if (i == 0) {
                            selectvalue += $checked[i].title;
                        }
                        else {
                            selectvalue += ',' + $checked[i].title;
                        }
                        //if (selectvalue.length > 10) {
                        //    selectvalue += "...";
                        //    break;
                        //}
                    }
                    value = selectvalue;
                }
            }

            this._setButtonValue(value);

            return value;
        },
        //get text
        txt: function () {
            var $checked = this.menu.find('input').filter(':checked');
            var numChecked = $checked.length;
            var mutlitxt = '';
            if (numChecked === 0) {
                mutlitxt = '';
            } else {
                mutlitxt = $checked.map(function () { return $(this).next().html(); }).get().join(',');
            }
            return mutlitxt;
        },
        // this exists as a separate method so that the developer 
        // can easily override it.
        _setButtonValue: function (value) {
            this.buttonlabel.text(value);
            this.buttonlabel.attr('title', value);
        },

        // binds events
        _bindEvents: function () {
            var self = this;
            var button = this.button;

            function clickHandler() {
                self[self._isOpen ? 'close' : 'open']();
                return false;
            }

            // webkit doesn't like it when you click on the span :(
            button
              .find('span')
              .bind('click.multiselect', clickHandler);

            // button events
            button.bind({
                click: clickHandler,
                keypress: function (e) {
                    switch (e.which) {
                        case 27: // esc
                        case 38: // up
                        case 37: // left
                            self.close();
                            break;
                        case 39: // right
                        case 40: // down
                            self.open();
                            break;
                    }
                },
                mouseenter: function () {
                    if (!button.hasClass('ui-state-disabled')) {
                        $(this).addClass('ui-state-hover');
                    }
                },
                mouseleave: function () {
                    $(this).removeClass('ui-state-hover');
                },
                focus: function () {
                    if (!button.hasClass('ui-state-disabled')) {
                        $(this).addClass('ui-state-focus');
                    }
                },
                blur: function () {
                    $(this).removeClass('ui-state-focus');
                }
            });

            // header links
            this.header.delegate('a', 'click.multiselect', function (e) {
                // close link
                if ($(this).hasClass('ui-multiselect-close')) {
                    self.close();

                    // check all / uncheck all
                } else {
                    self[$(this).hasClass('ui-multiselect-all') ? 'checkAll' : 'uncheckAll']();
                }

                e.preventDefault();
            });

            //为搜索框绑定搜索事件
            this.searchFn.delegate('', 'keyup.multiselect', function () {
                var $this = $(this),
                    //内容：去除输入内容前后空格
                    //作者：Sam.Wang
                    //修改时间：2014-11-19
                    //-----------------------Start-----------------------
                    _v = $.trim($this.val()),
                    //-----------------------End-----------------------
                    $ul = $this.next(),
                    $items = $ul.find('li').not('.no-results'),
                    _index = 0;
                if (_v) {
                    _index = 0;
                    for (var i = 0; i < $items.length; i++) {
                        if ($items.eq(i).find('span').html().indexOf(_v) > -1) {
                            $items.eq(i).show();
                            _index++;
                        } else {
                            $items.eq(i).hide();
                        }
                    }

                    //内容：清除提示信息
                    //作者：Sam.Wang
                    //修改时间：2014-11-19
                    //-----------------------Start-----------------------
                    var content = $ul.find('.no-results');
                    if (content) {
                        content.html('').hide();
                        //-----------------------End-----------------------

                        if (!_index) {
                            var hint = LanguageHelp.FilterResult || "没有匹配的";
                            if (content.length > 0) {
                                content.html(hint + ' <span>" ' + _v + ' "</span>').show();
                            } else {
                                $ul.append('<li class="no-results" style="background: #f4f4f4;display: list-item;">' + hint + ' <span>" ' + _v + ' "</span></li>');
                            }
                        }
                    }
                } else {
                    $items.show();
                    $ul.find('.no-results').hide();
                }
            })

            // optgroup label toggle support
            this.menu.delegate('li.ui-multiselect-optgroup-label a', 'click.multiselect', function (e) {
                e.preventDefault();

                var $this = $(this);
                var $inputs = $this.parent().nextUntil('li.ui-multiselect-optgroup-label').find('input:visible:not(:disabled)');
                var nodes = $inputs.get();
                var label = $this.parent().text();

                // trigger event and bail if the return is false
                if (self._trigger('beforeoptgrouptoggle', e, { inputs: nodes, label: label }) === false) {
                    return;
                }

                // toggle inputs
                self._toggleChecked(
                  $inputs.filter(':checked').length !== $inputs.length,
                  $inputs
                );

                self._trigger('optgrouptoggle', e, {
                    inputs: nodes,
                    label: label,
                    checked: nodes[0].checked
                });
            })
            .delegate('label', 'mouseenter.multiselect', function () {
                if (!$(this).hasClass('ui-state-disabled')) {
                    self.labels.removeClass('ui-state-hover');
                    $(this).addClass('ui-state-hover').find('input').focus();
                }
            })
            .delegate('label', 'keydown.multiselect', function (e) {
                e.preventDefault();

                switch (e.which) {
                    case 9: // tab
                    case 27: // esc
                        self.close();
                        break;
                    case 38: // up
                    case 40: // down
                    case 37: // left
                    case 39: // right
                        self._traverse(e.which, this);
                        break;
                    case 13: // enter
                        $(this).find('input')[0].click();
                        break;
                }
            })
            .delegate('input[type="checkbox"], input[type="radio"]', 'click.multiselect', function (e) {
                var $this = $(this);
                var val = this.value;
                var checked = this.checked;
                var tags = self.element.find('option');

                // bail if this input is disabled or the event is cancelled
                if (this.disabled || self._trigger('click', e, { value: val, text: this.title, checked: checked }) === false) {
                    e.preventDefault();
                    return;
                }

                // make sure the input has focus. otherwise, the esc key
                // won't close the menu after clicking an item.
                $this.focus();

                // toggle aria state
                $this.attr('aria-selected', checked);

                // change state on the original option tags
                tags.each(function () {
                    if (this.value === val) {
                        this.selected = checked;
                    } else if (!self.options.multiple) {
                        this.selected = false;
                    }
                });

                // some additional single select-specific logic
                if (!self.options.multiple) {
                    self.labels.removeClass('ui-state-active');
                    $this.closest('label').toggleClass('ui-state-active', checked);

                    // close menu
                    self.close();
                }

                // fire change on the select box
                self.element.trigger("change");

                // setTimeout is to fix multiselect issue #14 and #47. caused by jQuery issue #3827
                // http://bugs.jquery.com/ticket/3827
                setTimeout($.proxy(self.update, self), 10);
            });

            // close each widget when clicking on any other element/anywhere else on the page
            $doc.bind('mousedown.' + this._namespaceID, function (e) {
                if (self._isOpen && !$.contains(self.menu[0], e.target) && !$.contains(self.button[0], e.target) && e.target !== self.button[0]) {
                    self.close();
                }
            });

            // deal with form resets.  the problem here is that buttons aren't
            // restored to their defaultValue prop on form reset, and the reset
            // handler fires before the form is actually reset.  delaying it a bit
            // gives the form inputs time to clear.
            $(this.element[0].form).bind('reset.multiselect', function () {
                setTimeout($.proxy(self.refresh, self), 10);
            });
        },

        // set button width
        _setButtonWidth: function () {
            //var width = this.element.outerWidth();
            //var o = this.options;

            //if (/\d/.test(o.minWidth) && width < o.minWidth) {
            //    width = o.minWidth;
            //}

            //// set widths
            //this.button.outerWidth(width);
            // this.button.outerWidth(this.options.minWidth + 19);
        },

        // set menu width
        _setMenuWidth: function () {
            var m = this.menu;
            m.outerWidth(this.button.outerWidth());
        },

        // move up or down within the menu
        _traverse: function (which, start) {
            var $start = $(start);
            var moveToLast = which === 38 || which === 37;

            // select the first li that isn't an optgroup label / disabled
            $next = $start.parent()[moveToLast ? 'prevAll' : 'nextAll']('li:not(.ui-multiselect-disabled, .ui-multiselect-optgroup-label)')[moveToLast ? 'last' : 'first']();

            // if at the first/last element
            if (!$next.length) {
                var $container = this.menu.find('ul').last();

                // move to the first/last
                this.menu.find('label')[moveToLast ? 'last' : 'first']().trigger('mouseover');

                // set scroll position
                $container.scrollTop(moveToLast ? $container.height() : 0);

            } else {
                $next.find('label').trigger('mouseover');
            }
        },

        // This is an internal function to toggle the checked property and
        // other related attributes of a checkbox.
        //
        // The context of this function should be a checkbox; do not proxy it.
        _toggleState: function (prop, flag) {
            return function () {
                if (!this.disabled) {
                    this[prop] = flag;
                }

                if (flag) {
                    this.setAttribute('aria-selected', true);
                } else {
                    this.removeAttribute('aria-selected');
                }
            };
        },

        _toggleChecked: function (flag, group) {
            var $inputs = (group && group.length) ? group : this.inputs;
            var self = this;

            // toggle state on inputs
            $inputs.each(this._toggleState('checked', flag));

            // give the first input focus
            $inputs.eq(0).focus();

            // update button text
            this.update();

            // gather an array of the values that actually changed
            var values = $inputs.map(function () {
                return this.value;
            }).get();

            // toggle state on original option tags
            this.element
              .find('option')
              .each(function () {
                  if (!this.disabled && $.inArray(this.value, values) > -1) {
                      self._toggleState('selected', flag).call(this);
                  }
              });

            // trigger the change event on the select
            if ($inputs.length) {
                this.element.trigger("change");
            }
        },

        _toggleDisabled: function (flag) {
            this.button.attr({ 'disabled': flag, 'aria-disabled': flag })[flag ? 'addClass' : 'removeClass']('ui-state-disabled');

            var inputs = this.menu.find('input');
            var key = "ech-multiselect-disabled";

            if (flag) {
                // remember which elements this widget disabled (not pre-disabled)
                // elements, so that they can be restored if the widget is re-enabled.
                inputs = inputs.filter(':enabled').data(key, true)
            } else {
                inputs = inputs.filter(function () {
                    return $.data(this, key) === true;
                }).removeData(key);
            }

            inputs
              .attr({ 'disabled': flag, 'arial-disabled': flag })
              .parent()[flag ? 'addClass' : 'removeClass']('ui-state-disabled');

            this.element.attr({
                'disabled': flag,
                'aria-disabled': flag
            });
        },

        // open the menu
        open: function (e) {
            var self = this;
            var button = this.button;
            var menu = this.menu;
            var speed = this.speed;
            var o = this.options;
            var args = [];

            // bail if the multiselectopen event returns false, this widget is disabled, or is already open
            if (this._trigger('beforeopen') === false || button.hasClass('ui-state-disabled') || this._isOpen) {
                return;
            }

            var $container = menu.find('ul').last();
            var effect = o.show;

            // figure out opening effects/speeds
            if ($.isArray(o.show)) {
                effect = o.show[0];
                speed = o.show[1] || self.speed;
            }

            // if there's an effect, assume jQuery UI is in use
            // build the arguments to pass to show()
            if (effect) {
                args = [effect, speed];
            }

            // set the scroll of the checkbox container
            $container.scrollTop(0).height(o.height);

            // positon
            this.position();

            // show the menu, maybe with a speed/effect combo
            $.fn.show.apply(menu, args);

            // select the first option
            // triggering both mouseover and mouseover because 1.4.2+ has a bug where triggering mouseover
            // will actually trigger mouseenter.  the mouseenter trigger is there for when it's eventually fixed
            this.labels.eq(0).trigger('mouseover').trigger('mouseenter').find('input').trigger('focus');

            button.addClass('ui-state-active');
            this._isOpen = true;
            this._trigger('open');
        },

        // close the menu
        close: function () {
            if (this._trigger('beforeclose') === false) {
                return;
            }

            var o = this.options;
            var effect = o.hide;
            var speed = this.speed;
            var args = [];

            // figure out opening effects/speeds
            if ($.isArray(o.hide)) {
                effect = o.hide[0];
                speed = o.hide[1] || this.speed;
            }

            if (effect) {
                args = [effect, speed];
            }

            $.fn.hide.apply(this.menu, args);
            this.button.removeClass('ui-state-active').trigger('blur').trigger('mouseleave');
            this._isOpen = false;
            this._trigger('close');
        },

        enable: function () {
            this._toggleDisabled(false);
        },

        disable: function () {
            this._toggleDisabled(true);
        },

        checkAll: function (e) {
            this._toggleChecked(true);
            this._trigger('checkAll');
        },

        uncheckAll: function () {
            this._toggleChecked(false);
            this._trigger('uncheckAll');
        },

        getChecked: function () {
            return this.menu.find('input').filter(':checked');
        },

        destroy: function () {
            // remove classes + data
            $.Widget.prototype.destroy.call(this);

            // unbind events
            $doc.unbind(this._namespaceID);

            this.button.remove();
            this.menu.remove();
            this.element.show();

            return this;
        },

        isOpen: function () {
            return this._isOpen;
        },

        widget: function () {
            return this.menu;
        },

        getButton: function () {
            return this.button;
        },

        position: function () {
            var o = this.options;

            // use the position utility if it exists and options are specifified
            if ($.ui.position && !$.isEmptyObject(o.position)) {
                o.position.of = o.position.of || this.button;

                this.menu
                  .show()
                  .position(o.position)
                  .hide();

                // otherwise fallback to custom positioning
            } else {
                var pos = this.button.offset();

                this.menu.css({
                    top: pos.top + this.button.outerHeight(),
                    left: pos.left,
                    width: this.button.outerWidth() - 8   //set menu's width （xzye supplement）
                });
            }
        },

        // react to option changes after initialization
        _setOption: function (key, value) {
            var menu = this.menu;

            switch (key) {
                case 'header':
                    menu.find('div.ui-multiselect-header')[value ? 'show' : 'hide']();
                    break;
                case 'checkAllText':
                    menu.find('a.ui-multiselect-all span').eq(-1).text(value);
                    break;
                case 'uncheckAllText':
                    menu.find('a.ui-multiselect-none span').eq(-1).text(value);
                    break;
                case 'height':
                    menu.find('ul').last().height(parseInt(value, 10));
                    break;
                case 'minWidth':
                    this.options[key] = parseInt(value, 10);
                    this._setButtonWidth();
                    this._setMenuWidth();
                    break;
                case 'selectedText':
                case 'selectedList':
                case 'noneSelectedText':
                    this.options[key] = value; // these all needs to update immediately for the update() call
                    this.update();
                    break;
                case 'classes':
                    menu.add(this.button).removeClass(this.options.classes).addClass(value);
                    break;
                case 'multiple':
                    menu.toggleClass('ui-multiselect-single', !value);
                    this.options.multiple = value;
                    this.element[0].multiple = value;
                    this.refresh();
                    break;
                case 'position':
                    this.position();
            }

            $.Widget.prototype._setOption.apply(this, arguments);
        }
    });

})(jQuery);
