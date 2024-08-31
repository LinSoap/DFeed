import { XMLParser, XMLValidator } from "fast-xml-parser";
const parser = new XMLParser({ ignoreAttributes: false ,attributeNamePrefix: ''});
// const builder = new XMLBuilder();
export function parseXML(xml: string) {
    let jObj = parser.parse(xml, true);
    return jObj;
}

export function validateXML(xml: string) {
    return XMLValidator.validate(xml);
}

// export function buildOpml(jObj: any) {