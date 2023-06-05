class KegmonConfig {
  url = "http://localhost";
  interval = 5;
  layout = "1";

  save() {
    var s = this.toString();
    console.log(s);
    localStorage.setItem("kegmonapp", s);
    this.dump();
  }

  load() {
    var s = localStorage.getItem("kegmonapp");

    if(s == null) {
      console.log("No stored settings found, using defaults.")
    } else {
      this.parseString(s);
    }

    this.dump();
  }

  hasValidURL() {
    return this.url.startsWith("http://");
  }

  toString() {
    var json = {};
    json["url"] = this.url;
    json["interval"] = this.interval;  
    json["layout"] = this.layout;  
    console.log("toString() " + JSON.stringify(json));
    return JSON.stringify(json);
  }

  parseString(s) {  
    console.log(s);
    var json = JSON.parse(s);

    if(json["url"] != undefined)
      this.url = json["url"];
    
    if(json["interval"] != undefined)
      this.interval = json["interval"];  

    if(json["layout"] != undefined)
      this.layout = json["layout"];  
  }

  dump() {
    console.log("KegmonConfig::dump, showing kegmonapp settings.");
    console.log("URL: " + this.url + " (" + typeof(this.url) + ")");
    console.log("Interval: " + this.interval + " (" + typeof(this.interval) + ")");
    console.log("Layout: " + this.layout + " (" + typeof(this.layout) + ")");
  }
}

function kegmonToTaplist(json) {
  var tap1 = new TapListItem(json["beer-name1"], "", "", "", json["beer-abv1"], json["beer-ebc1"], json["beer-ibu1"], "", 0, "glasses");
  var tap2 = new TapListItem(json["beer-name2"], "", "", "", json["beer-abv2"], json["beer-ebc2"], json["beer-ibu2"], "", 0, "glasses");
  var tapList = [ tap1, tap2 ];
  return tapList;
}

class TapListItem {
  beer = "";
  style = "";
  brewer = "";
  description = "";
  abv = 0;
  ebc = 0;
  ibu = 0;
  date = "";
  amount = 0;
  unit = "glasses";

  constructor(beer, style, brewer, description, abv, ebc, ibu, date, amount, unit) {
    this.beer = beer;
    this.style = style;
    this.brewer = brewer;
    this.description = description;
    this.abv = abv;
    this.ebc = ebc;
    this.ibu = ibu;
    this.date = date;
    this.amount = amount;
    this.unit = unit;
  }

  getImagePrefix() {
    /* Images with color
       EBC, 2, 4, 12, 18, 24, 30, 40
    */
    var prefix = "color-2.png";

    if(this.ebc >= 0 && this.ebc <= 3)
      prefix = "color-2.png";
    else if(this.ebc > 3 && this.ebc <= 8)
      prefix = "color-4.png";
    else if(this.ebc > 8 && this.ebc <= 16)
      prefix = "color-12.png";
    else if(this.ebc > 16 && this.ebc <= 21)
      prefix = "color-18.png";
    else if(this.ebc > 21 && this.ebc <= 27)
      prefix = "color-24.png";
    else if(this.ebc > 27 && this.ebc <= 35)
      prefix = "color-30.png";
    else if(this.ebc > 35)
      prefix = "color-40.png";

    return prefix;
  }

  toJson() {
    var json = {};
    json["beer"] = this.beer;
    json["style"] = this.style;
    json["brewer"] = this.brewer;
    json["description"] = this.description;
    json["abv"] = this.abv;
    json["ebc"] = this.ebc;
    json["ibu"] = this.ibu;
    json["date"] = this.date;
    json["amount"] = this.amount;
    json["unit"] = this.unit;
    return json;
  } 

  toString() {
    var json = this.toJson();
    console.log("toString() " + JSON.stringify(json));
    return JSON.stringify(json);
  }

  parseString(s) {  
    console.log(s);
    var json = JSON.parse(s);

    this.beer = json["beer"];
    this.style = json["style"];
    this.brewer = json["brewer"] ;
    this.description = json["description"];
    this.abv = json["abv"];
    this.ebc = json["ebc"];
    this.ibu = json["ibu"];
    this.date = json["date"];
    this.amount = json["amount"];
    this.unit = json["unit"];
  }
}

class TapList {
  taps = { taps: [] };

  addTap(tap) {
    this.taps["taps"].push(tap); 
  }

  getTaps() {
    return this.taps["taps"];
  }

  getTapCount() {
    return this.taps["taps"].length;
  }
}

