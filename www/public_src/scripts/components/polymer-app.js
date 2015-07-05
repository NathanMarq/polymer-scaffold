Polymer({
  is : "polymer-app",
  properties : {
    headerBGColor : {
      type : String,
      value: "#555"
    },

    titleSize : {
      type : Number
    },

    subtitleSize : {
      type : Number
    },

    colorOptions : {
      type : Array
    }
  },

  ready : function(){

    this.colorOptions = [
      '#002635',
      '#013440',
      '#AB1A25',
      '#D97925'
    ];

  },

  handleResponse : function(request){

  },

  handleError : function(request, error){
    console.log(error);
  },

  changeColor : function(e){
    this.customStyle['--header-background-color'] = e.model.item;
    this.updateStyles();
  },

  validateTitleSize : function(titleSize){
    this.customStyle['--header-title-size'] = titleSize+"px";
    this.updateStyles();
  },

  validateSubtitleSize : function(subtitleSize){
    this.customStyle['--header-subtitle-size'] = subtitleSize+"px";
    this.updateStyles();
  },

  setThisBGColor : function(item){
    return "background-color: "+item;
  }

});
