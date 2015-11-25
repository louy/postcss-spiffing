var postcss = require("postcss");

module.exports = postcss.plugin("postcss-spiffing", function (opts) {
    return function(css) {
      css.walkDecls(function(decl) {
        decl.prop = decl.prop.replace(/colour/g, "color");

        if(["text-align", "justify-content", "align-items", "align-content", "align-self"].indexOf(decl.prop) !== -1 && decl.value === "centre") {
          decl.value = "center";
        } else if(decl.prop === "font-weight" && decl.value === "plump") {
          decl.value = "bold";
        } else if(decl.prop === "transparency") {
          decl.prop = "opacity";
          if(Number(decl.value) == decl.value && (parseFloat(decl.value) <= 1 && parseFloat(decl.value) >= 0)) {
            decl.value = (1 - parseFloat(decl.value)).toFixed((Number(decl.value) + '').replace('.', '').length -1);
          }
        } else if(decl.prop === "text-transform" && decl.value === "capitalise") {
          decl.value = "capitalize";
        } else if(decl.prop === "color" || decl.prop === "background-color" || decl.prop === "border" || decl.prop === "border-color") {
          decl.value = decl.value.replace(/grey/g, "gray");
        } else if(decl.prop === "background-photograph") {
          decl.prop = "background-image";
        }

        if(decl.value.match(/!please$/)) {
          decl.value = decl.value.substring(0, decl.value.length-7).trim();
          decl.important = true;
        }

        decl.value = decl.value.replace(/(var\(--[^\)]*)colour([^\)]*\))/g, "$1color$2");
      });

      css.walkAtRules(function(rule) {
        if(rule.name === "medium") {
          rule.name = "media";
        }
      });
    }
});
