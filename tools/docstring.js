var __interactive_mode__;

function is_interactive() {
    return !module.parent;
}
__interactive_mode__ = is_interactive();
function get_attr_docstring(class_type, attr_name) {
    var attr;
    if ((attr_name === "get")) {
        attr_name = "__call__";
    }
    attr = (class_type[attr_name] || null);
    if ((attr && attr.__doc__)) {
        return attr.__doc__.replace(" {3,}", "");
    }
}
function default_attr_filter(x) {
    return (! x.startswith("_"));
}
function get_class_docstring(class_type, attr_filter = default_attr_filter, extended = false) {
    function attr_format(x) {
        var attr, doc, name, sig;
        attr = class_type[x];
        if ((Object.getPrototypeOf(attr) === property)) {
            name = `.${x}`;
        } else {
            if (extended) {
                sig = attr.toString().replace("self, ", "");
            } else {
                sig = "()";
            }
            name = `.${x}${sig}`;
        }
        if (extended) {
            doc = get_attr_docstring(class_type, x);
        } else {
            doc = "";
        }
        return `${name}${doc}`;
    }
    return "\n".join(map(attr_format, filter(attr_filter, dir(class_type))));
}
export {default_attr_filter, get_attr_docstring, get_class_docstring, is_interactive, __interactive_mode__};

//# sourceMappingURL=docstring.js.map
