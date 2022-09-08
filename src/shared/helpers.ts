import convert from "xml-js";

export function RemoveJsonTextAttribute(value: any, parentElement: any) {
   try {
      var keyNo = Object.keys(parentElement._parent).length;
      var keyName = Object.keys(parentElement._parent)[keyNo - 1];
      parentElement._parent[keyName] = value;
   } catch (e) {}
}

export function Rupiah(number: number) {
   return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
   }).format(number);
}

export function initArray(keys: any) {
   var result = [];

   for (let i = 0; i < Object.keys(keys).length; i++) {
      if (keys["prdImage0" + i]) {
         result.push(keys["prdImage0" + i]);
      }
   }

   return result;
}

export function strMatch(str: string, targetString: string) {
   if (!str) return true;
   if (!targetString) return false;
   return String(targetString).toLowerCase().includes(String(str).toLowerCase());
}

export function parseXMLtoJS(data: any) {
   return convert.xml2js(data, {
      compact: true,
      textFn: RemoveJsonTextAttribute,
      ignoreDeclaration: true,
   });
}
