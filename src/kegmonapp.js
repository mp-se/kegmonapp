class KegmonConfig {
  url = "http://localhost";
  interval = 5;

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
  }

  dump() {
    console.log("KegmonConfig::dump, showing kegmonapp settings.");
    console.log("URL: " + this.url + " (" + typeof(this.url) + ")");
    console.log("Interval: " + this.interval + " (" + typeof(this.interval) + ")");
  }
}
