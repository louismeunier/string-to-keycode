const alphaLower:RegExp = /[a-z]/
const alphaUpper:RegExp = /[A-Z]/
const numeric:RegExp = /[0-9]/
const altNum:RegExp = /[!@#$%^&*()]/
const whitespace:RegExp = /\s/

const alphaNumericCode = (char: string, modify: boolean,) : string => {
    if (modify) {
        return `}{KC_LSFT,KC_${char}}{`
    } else {
        return `KC_${char},`
    }
} 

export default function convertString(input: string) : macro[] {
    const converted:macro[] = input.split("").map((char, index) => {
        var key:string;
        if (char.match(alphaLower)) {
            key = alphaNumericCode(char.toUpperCase(), false);
        } else if (char.match(alphaUpper)) {
            key = alphaNumericCode(char.toUpperCase(), true);
        } else if (char.match(numeric)) {
            key = alphaNumericCode(char, false);
        } else if (char.match(altNum)) {
            key = alphaNumericCode(char, true);
        } else if (char.match(whitespace)) {
            key = "KC_SPC,";
        } else {
            key = "";
        }
        if (index===0) key=`{${key}`
        if (index===input.length-1) key=`${key}}`

        return key;
    })

    return converted;
}