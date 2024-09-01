import { XMLBuilder, XMLParser, XMLValidator } from "fast-xml-parser";
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '_'});
// const parser = new XMLParser({ ignoreAttributes: false });
const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '_',
  suppressEmptyNode: true,
  format: true,
});

export function buildOpml(jObj: any) {
    return builder.build(jObj);
}

export function parseXML(xml: string) {
    let jObj = parser.parse(xml, true);
    return jObj;
}

export function validateXML(xml: string) {
    return XMLValidator.validate(xml);
}

// export function buildOpml(jObj: any) {