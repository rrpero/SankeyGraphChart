define( [

	'jquery',
	'qlik',
	'ng!$q',
	'ng!$http'


], function ($, qlik, $q, $http) {
    'use strict';
	//Define the current application
	var messages = {
		en_US: {
					
		},
		pt_BR: {
				
		}
	};
	var language="pt_BR";
	//var language="en_US";
	var app = qlik.currApp();

    // *****************************************************************************
    // Dimensions & Measures
    // *****************************************************************************
    var dimensions = {
        uses: "dimensions",
        min: 2,
        max: 2
    };

    var measures = {
        uses: "measures",
        min: 1,
        max: 1
    };

    // *****************************************************************************
    // Appearance Section
    // *****************************************************************************
    var appearanceSection = {
        uses: "settings"
    };
	
	// *****************************************************************************
    // Sorting Section
    // *****************************************************************************
    var sortingSection = {
        uses: "sorting"
    };
	
	// *****************************************************************************
    // Options Section
    // *****************************************************************************
	
	messages[language].CHART_TYPE= "Tipo de Gráfico";
	messages[language].CHORD = "Chord";
	messages[language].BIPARTITE = "Bipartido";

	var chartType = {
			type: "string",
			component: "dropdown",
			label: messages[language].CHART_TYPE,
			
			//label:app.GetLocaleInfo().qReturn.qCollation,
			ref: "chartType",
			options: [{
				value: "chord",
				label: messages[language].CHORD
			}, 
			{
				value: "biPartite",
				label: messages[language].BIPARTITE
			}
			],
			defaultValue: "biPartite"
	};
	
	messages[language].EDGE_MODE = "Tipo de Linha";
	messages[language].STRAIGHT =  "Reto";
	messages[language].CURVED = "Curvado";
	var edgeMode = {
			type: "string",
			component: "dropdown",
			label: messages[language].EDGE_MODE,
			
			//label:app.GetLocaleInfo().qReturn.qCollation,
			ref: "edgeMode",
			options: [{
				value: "curved",
				label: messages[language].CURVED
			}, 
			{
				value: "straight",
				label: messages[language].STRAIGHT
			}
			],
			defaultValue: "curved"
	};	
	
	
	
	messages[language].LABEL_TEXT_SIZE = "Fonte Label";
	var fontSizeLabel = {
			type: "integer",
			label: messages[language].LABEL_TEXT_SIZE,
			ref: "fontSizeLabel",
			component: "slider",
			min: 5,
			max: 30,
			step: 1,			
			//expression: "always",
			defaultValue: 12
	};	
	
	
	messages[language].CHART_WIDTH = "Largura";
	var chartWidth = {
			type: "integer",
			label: messages[language].CHART_WIDTH,
			ref: "width",
			component: "slider",
			min: 1,
			max: 20,
			step: 0.25,			
			//expression: "always",
			defaultValue: 8
	};		

	
	messages[language].CHART_HEIGHT = "Altura";
	var chartHeight = {
			type: "integer",
			label: messages[language].CHART_HEIGHT,
			ref: "height",
			component: "slider",
			min: 1,
			max: 20,
			step: 0.25,			
			//expression: "always",
			defaultValue: 8
	};		
	
	messages[language].MAX_TEXT_SIZE =  "Tamanho Máximo Texto";
	var maxTextSize = {
			type: "integer",
			label: messages[language].MAX_TEXT_SIZE,
			ref: "maxTextSize",
			component: "slider",
			min: 1,
			max: 20,
			step: 0.5,			
			//expression: "always",
			defaultValue: 4
	};

	messages[language].POS_X =  "Posição Horizontal";
	var posX = {
			type: "integer",
			label: messages[language].POS_X,
			ref: "posX",
			component: "slider",
			min: -100,
			max: 200,
			step: 0.5,			
			//expression: "always",
			defaultValue: 0
	};	

	messages[language].POS_Y =  "Posição Vertical";
	var posY = {
			type: "integer",
			label: messages[language].POS_Y,
			ref: "posY",
			component: "slider",
			min: -60,
			max: 200,
			step: 0.5,			
			//expression: "always",
			defaultValue: 0
	};	
	
	messages[language].SPACE_LABEL_RIGHT =  "Espaço Label Direita";
	var spaceLabelRight = {
			type: "integer",
			label: messages[language].SPACE_LABEL_RIGHT,
			ref: "spaceLabelRight",
			component: "slider",
			min: 0,
			max: 5,
			step: 0.5,			
			//expression: "always",
			defaultValue: 2
	};

	messages[language].SPACE_LABEL_LEFT =  "Espaço Label Esquerda";
	var spaceLabelLeft = {
			type: "integer",
			label: messages[language].SPACE_LABEL_LEFT,
			ref: "spaceLabelLeft",
			component: "slider",
			min: 0,
			max: 5,
			step: 0.5,			
			//expression: "always",
			defaultValue: 2
	};	
	
	
	messages[language].PAD =  "Espaçamento";
	var pad = {
			type: "integer",
			label: messages[language].PAD,
			ref: "pad",
			component: "slider",
			min: 0,
			max: 10,
			step: 0.5,			
			//expression: "always",
			defaultValue: 2
	};	
		
	
	messages[language].ANALOGUE1 =  "Análogas 1";
	messages[language].ANALOGUE2 =  "Análogas 2";
	messages[language].YELLOWRED =  "Amarelo->Vernelho";
	messages[language].WHITEBLUE =  "Branco->Azul";
	messages[language].COLORS= "Cores";
	messages[language].STANDARD_QS= "Padrão QS"
	messages[language].COLORED= "Colorido";
	messages[language].BRAZIL= "Brasil";
	messages[language].BELGIUM= "Bélgica";
	messages[language].FRANCE= "França";
	messages[language].ENGLAND= "Inglaterra";		
	var palette = {
			type: "string",
			component: "dropdown",
			label: messages[language].COLORS,
			ref: "palette",
			options: [{
				value: "standard",
				label: messages[language].STANDARD_QS
			},{
				value: "colored",
				label: messages[language].COLORED
			},{
				value: "analogue1",
				label: messages[language].ANALOGUE1
			},{
				value: "analogue2",
				label: messages[language].ANALOGUE2
			},{
				value: "yellowRed",
				label: messages[language].YELLOWRED
			},{
				value: "whiteBlue",
				label: messages[language].WHITEBLUE
			},{
				value: "brazil",
				label: messages[language].BRAZIL
			},{
				value: "france",
				label: messages[language].FRANCE
			},{
				value: "belgium",
				label: messages[language].BELGIUM
			},{
				value: "england",
				label: messages[language].ENGLAND
			}
			
			],
			defaultValue: "analogue1"
	};		

	messages[language].BOLD = "Negrito";
	messages[language].NORMAL = "Normal";
	var bold = {
			type: "string",
			component: "dropdown",
			label: messages[language].BOLD,
			ref: "bold",
			options: [{
				value: "normal",
				label: messages[language].NORMAL
			},{
				value: "bold",
				label: messages[language].BOLD
			}
			
			],
			defaultValue: "bold"
	};
	
	messages[language].LABEL_IN = "Label Dentro";
	messages[language].LABEL_OUT = "Label Fora";
	var labelIn = {
			type: "string",
			component: "dropdown",
			label: messages[language].LABEL_IN,
			ref: "labelIn",
			options: [{
				value: "in",
				label: messages[language].LABEL_IN
			},{
				value: "out",
				label: messages[language].LABEL_OUT
			}
			
			],
			defaultValue: "out"
	};	
	
	messages[language].ORIENT = "Orientação";
	messages[language].VERTICAL = "vertical";
	messages[language].HORIZONTAL = "horizontal";
	var orient = {
			type: "string",
			component: "dropdown",
			label: messages[language].ORIENT,
			ref: "orient",
			options: [{
				value: "vertical",
				label: messages[language].VERTICAL
			},{
				value: "horizontal",
				label: messages[language].HORIZONTAL
			}
			
			],
			defaultValue: "vertical"
	};	


	messages[language].CAPITALIZE = "Capitalizar";
	messages[language].UPPER = "Maiúsculas";
	
	var capitalize = {
			type: "string",
			component: "dropdown",
			label: messages[language].CAPITALIZE,
			ref: "capitalize",
			options: [{
				value: "capitalize",
				label: messages[language].CAPITALIZE
			},{
				value: "upper",
				label: messages[language].UPPER
			}
			
			],
			defaultValue: "upper"
	};	

	messages[language].BARSIZE = "Tamanho da Barra";
	var barSize = {
			type: "integer",
			component: "dropdown",
			label: messages[language].BARSIZE,
			ref: "barSize",
			options: [{
				value: -50,
				label: "0"
			},{
				value: -40,
				label: 1
			},{
				value: -30,
				label: 2
			},{
				value: -20,
				label: 3
			},{
				value: -10,
				label: 4
			},{
				value: 0,
				label: 5
			},{
				value: 10,
				label: 6
			},{
				value: 20,
				label: 7
			},{
				value: 30,
				label: 8
			},{
				value: 40,
				label: 9
			},{
				value: 50,
				label: 10
			}
			
			],
			defaultValue: 0
	};		
	
	messages[language].BORDER = "Borda";
	messages[language].YES = "Sim";
	messages[language].NO = "Não";
	
	var border = {
		type: "boolean",
		component: "switch",
		label: messages[language].BORDER,
		ref: "border",
		options: [{
			value: true,
			label: messages[language].YES
		}, {
			value: false,
			label: messages[language].NO
		}],
		defaultValue: false
	};	
	
	
	messages[language].BACKGROUND_COLOR = "Cor de Fundo";
	var backgroundColor = {
			type: "string",
			label: messages[language].BACKGROUND_COLOR,
			ref: "backgroundColor",
			component:"color-picker",
			//expression: "always",
			defaultValue: "#ffffff"
	};	
	
	messages[language].FONT_COLOR = "Cor da Letra";
	var fontColor = {
			type: "string",
			label: messages[language].FONT_COLOR,
			ref: "fontColor",
			component:"color-picker",
			//expression: "always",
			defaultValue: "#190000"
	};	
	
	/*
	var keepColors = {
			type: "boolean",
			component: "switch",
			label: messages[language].KEEP_COLORS,
			ref: "keepColors",
			options: [{
				value: true,
				label: messages[language].ON
			}, {
				value: false,
				label: messages[language].OFF
			}],
			defaultValue: false
	};		*/
	
	
	
	messages[language].ITEM_OPTIONS="Opções";
	var Options = {
		type:"items",
		label:messages[language].ITEM_OPTIONS,
		items: {			
			chartType:chartType,
			chartWidth:chartWidth,
			chartHeight:chartHeight,
			posX:posX,
			posY:posY,
			edgeMode:edgeMode,
			barSize:barSize,
			pad:pad,
			fontSizeLabel:fontSizeLabel,
			spaceLabelLeft:spaceLabelLeft,
			spaceLabelRight:spaceLabelRight,			
			labelIn:labelIn,
			fontColor:fontColor,
			maxTextSize:maxTextSize,
			bold:bold,
			orient:orient,
			capitalize:capitalize,
			palette:palette,
			border:border,
			backgroundColor:backgroundColor
			//,keepColors:keepColors

			//,thousandSeparator:thousandSeparator
			//,decimalSeparator:decimalSeparator
		}
	
	};


	
	messages[language].EXPANDABLE_ITEM_OPTIONS = "Opções";
	var optionsSizeBorders = {
		//type:"items",
		component: "expandable-items",
		label:messages[language].EXPANDABLE_ITEM_OPTIONS,
		items: {			
			Options:Options
			
		}
	
	};		
	
    // *****************************************************************************
    // Main property panel definition
    // ~~
    // Only what's defined here will be returned from properties.js
    // *****************************************************************************
	  
	//******************************************************************************

    return {
        type: "items",
        component: "accordion",
        items: {
            //Default Sections
			dimensions: dimensions,
            measures: measures,
            appearance: appearanceSection,
			sorting: sortingSection,
			//Custom Sections
			optionsSizeBorders:optionsSizeBorders//,
			

        }
    };

} );
