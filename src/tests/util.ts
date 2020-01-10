import { View } from "tns-core-modules/ui/page/page";
import { TextBase } from "tns-core-modules/ui/text-base/text-base";

function getChildren(view: View): Array<View> {
    let children: Array<View> = [];
    (<any>view).eachChildView((child) => {
        children.push(child);
        return true;
    });
    return children;
}

  export function dumpView(view: View, verbose: boolean = false): string {
    let nodeName: string = (<any>view).nodeName;
    if (!nodeName) {
        // Strip off the source
        nodeName = view.toString().replace(/(@[^;]*;)/g, '');
    }
    nodeName = nodeName.toLocaleLowerCase();
    
    let output = ["(", nodeName];
    if (verbose) {
        if (view instanceof TextBase) {
            output.push("[text=", view.text, "]");
        }
    }

    let children = getChildren(view).map((c) => dumpView(c, verbose)).join(", ");
    if (children) {
        output.push(" ", children);
    }

    output.push(")");
    return output.join("");
}