let instance:TextStyles;
export class TextStyles {
    width: number;
    static SIZE_VERY_LARGE: number;
    static SIZE_LARGE: number;
    static SIZE_MED3: number;
    static SIZE_MED: number;
    static SIZE_MED2: number;
    static SIZE_SMALL: number;
    static SIZE_SMALL2: number;
    static MAIN_FONT: string;
    static DEFAULT: any;
    styles: any;
    constructor(width:number) {
        if (instance == null) {
            instance = this;
        }
        this.setConstants(width);
    }
    static getInstance(width:number) {
        if (instance == null) {
            instance = new TextStyles(width);
        }
        //window.textStyles=instance;
        return instance;
    }
    setConstants(width:number) {
        this.width = width;
        //
        //
        //
        TextStyles.SIZE_VERY_LARGE = width / 5;
        TextStyles.SIZE_LARGE = width / 10;
        TextStyles.SIZE_MED3 = width / 15;
        TextStyles.SIZE_MED = width / 20;
        TextStyles.SIZE_MED2 = width / 25;
        TextStyles.SIZE_SMALL = width / 30;
        TextStyles.SIZE_SMALL2 = width / 40;
        TextStyles.MAIN_FONT="Impact";

        this.styles = [];
        this.styles[TextStyles.DEFAULT] = {
            style: {
                color: '#ffffff',
                fontSize: TextStyles.SIZE_MED,
            }
        }
        this.setDefaults();
    }
    getSize(size:number) {
        return this.width/ size;
    }
    getStyle(style:any) {
        //get a config object
        //based on the style string
        if (!this.styles.hasOwnProperty(style)) {
            style = TextStyles.DEFAULT;
        }
        var styleConfig = this.styles[style];
        return styleConfig;
    }
    addStyle(key:string, style:any) {
        this.styles[key] = style;
    }
    regSimple(key:string, color:string, fontSize=TextStyles.SIZE_MED, font = TextStyles.MAIN_FONT) {

        let obj = {
            style: {
                color: color,
                fontSize: fontSize,
                fontFamily: font
            }
        };
        this.styles[key] = obj;
    }
    regAdvanced(key:string, color:string, fontSize = TextStyles.SIZE_MED, font = TextStyles.MAIN_FONT, stroke = "#ff0000", strokeThick = 4) {
        this.styles[key] = {
            stroke: stroke,
            strokeThick: strokeThick,
            style: {
                color: color,
                fontSize: fontSize,
                fontFamily: font
            }
        }
    }
    setDefaults() {
        //#271699
        //
        this.styles['DEFAULT'] = {
            style: {
                color: '#ffffff',
                fontSize: TextStyles.SIZE_MED,
                font: TextStyles.MAIN_FONT
            }
        }
        this.styles['PURPLE'] = {
            stroke: '#1D1F9C',
            strokeThick: 4,
            style: {
                color: '#1D1F9C',
                fontSize: TextStyles.SIZE_MED,
                fontFamily: TextStyles.MAIN_FONT
            }
        }
        this.styles['TOAST_BAR'] = {
            shadow: '#000000',
            stroke: '#ff0000',
            strokeThick: 4,
            style: {
                color: '#ffffff',
                fontSize: TextStyles.SIZE_MED,
                fontFamily: TextStyles.MAIN_FONT
            }
        }
        this.styles['CLOCK'] = {
            style: {
                color: '#ffffff',
                fontSize: TextStyles.SIZE_MED,
                fontFamily: TextStyles.MAIN_FONT
            }
        }
        this.styles['CLOCK2'] = {
            style: {
                color: '#000000',
                fontSize: TextStyles.SIZE_MED2,
                fontFamily: TextStyles.MAIN_FONT
            }
        }
        this.styles['TITLE_TEXT'] = {
            style: {
                fontFamily: TextStyles.MAIN_FONT,
                fontSize: TextStyles.SIZE_LARGE,
                color: "red"
            },
            shadow: "#000000",
            stroke: "#ffffff",
            strokeThickness: 2
        };
        this.styles['POINT_BOX'] = {
            style: {
                fontFamily: TextStyles.MAIN_FONT,
                fontSize: TextStyles.SIZE_LARGE,
                color: "red"
            },
            shadow: "#000000",
            stroke: "#ff0000",
            strokeThickness: 4
        };
        this.styles['SCORE'] = {
            style: {
                fontFamily: TextStyles.MAIN_FONT,
                fontSize: TextStyles.SIZE_LARGE,
                color: "#ffffff"
            }
        };
        this.styles['BLACK'] = {
            style: {
                fontFamily: TextStyles.MAIN_FONT,
                fontSize: TextStyles.SIZE_MED,
                color: "#000000"
            }
        };
        this.styles['POINTS'] = {
            style: {
                fontFamily: TextStyles.MAIN_FONT,
                fontSize: TextStyles.SIZE_VERY_LARGE,
                color: "#ff0000"
            }
        };
        this.styles['WHITE'] = {
            style: {
                fontFamily: TextStyles.MAIN_FONT,
                fontSize: TextStyles.SIZE_MED,
                color: "#ffffff"
            }
        };
        this.styles['BUTTON_STYLE'] = {
            style: {
                fontFamily: TextStyles.MAIN_FONT,
                fontSize: TextStyles.SIZE_MED3,
                color: "#ffffff",
            },
            shadow: "#000000"
        };
    }
}