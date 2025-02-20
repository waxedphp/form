
;(function ( $, window, document, undefined ) {

    var pluginName = 'formInputSelector',
        _search = 'form.waxed-form input.waxed-selector',
        _api = [],
        defaults = {
            propertyName: "value"
        },
        inited = false
        ;

    function Instance(pluggable,element,dd){
      var that = this;
      this.pluggable = pluggable;
      this.element = element;
      this.o = element;
      this.t = pluginName;
      this.dd = dd;
      this.name = '';
      this.cfg = {
      };

      this.invalidate = function(RECORD){

      },

      this.setRecord = function(RECORD){
        if (typeof that.dd.name == 'undefined') return;
        var rec = that.pluggable.getvar(that.dd.name, RECORD);
        if (typeof rec != 'object') { return; };
        if (typeof rec.value == 'string') { 
          
          $(that.element).val(rec.value);
        };

      },


      this.free = function() {

      },

        this.serializeControls = function(submitter) {
          var data = {};

          function buildInputObject(arr, val, ddd) {
            if (arr.length < 1)
              return val;
            var objkey = arr[0];
            if (objkey.slice(-1) == "]") {
              objkey = objkey.slice(0,-1);
            }
            var result = {};
            if (arr.length == 1){
              result[objkey] = val;
            } else {
              arr.shift();
              var nestedVal = buildInputObject(arr,val, ddd);
              result[objkey] = nestedVal;
            }
            return result;
          }

          function readElement(keys,val,ddd) {
            if (typeof keys == 'string') {
              keys = keys.split("[");
              console.log('keys after split', keys);
            }

            var k = keys.shift();
            k = k.split("]")[0].trim();
            if (typeof ddd == 'undefined') {
                if (k=='') {
                    ddd = [];
                } else {
                    ddd = {};
                }
            }


            if (keys.length == 0) {
              if (k=='') {
                if (typeof ddd!='object') {
                  ddd = [ddd, val];
                } else {
                  ddd.push(val);
                }
                return ddd;
              }
              if (typeof ddd[k]!='undefined') {
                if (typeof ddd[k]!='object') {
                  ddd[k] = [ddd[k], val];
                } else {
                  ddd[k].push(val);
                }
                return ddd;
              };
              ddd[k] = val;
              return ddd;
            }
            if (k=='') {
              ddd = [readElement(keys,val,ddd[k])];
            } else {
              ddd[k] = readElement(keys,val,ddd[k]);
            }



            return ddd;

          }

          const arr = $(that.element).serializeArray();
          console.log(arr);

          $.each(arr, function() {
            console.log('THIS', this);
            data = readElement(this.name, this.value, data);
            //var val = this.value;
            //var c = this.name.split("[");
            //console.log('build',c,val);
            //data = buildInputObject(c, val, data);
            //$.extend(true, data, a);
            //console.log(data,a);
          });

          var formId = that.pluggable.getDomId(that.element);
          data.FORMID = formId;
          
          if (typeof submitter == 'object') {
            var name = $(submitter).attr('name');
            var val = $(submitter).val();
            if ((typeof name != 'undefined')&&(typeof val != 'undefined')) {
              data[name] = val;
            };
          }
            
          return data;
        }

      this.init=function() {
        $(that.element).wrap('<div class="input-group mb-3"></div>');
        var b = $(that.element).parent();
        var c = $('<button class="btn btn-outline-secondary" type="button" >SELECT</button>').appendTo(b);
        var dd = $(that.element).data();
        that.dd.name = that.elemid = that.pluggable.getDomId(c);
        console.log('xxx', c);
        $(c).on('click', function(ev){
          ev.preventDefault();
          console.log(ev, dd);
          var o = {};
          for (var x in dd) o[x] = dd[x];
          o.action = dd.selectaction;
          o.ELEMID = that.elemid;
          delete o['selectaction'];
          delete o['selecturl'];
          that.pluggable.sendData(o, that.dd.selecturl, that);
        });
        inited = true;
      },
      this._init_();
    }

    $.waxxx(pluginName, _search, Instance, _api);


})( jQuery, window, document );
/*--*/
//# sourceURL: /js/jam/boilerplate/plugin.js
