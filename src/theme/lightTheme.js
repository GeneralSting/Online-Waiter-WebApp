import {
  americanSilver,
  cadetBlue,
  gainsboro,
  greyEightyEight,
  greyNinetyFive,
  greyTwenty,
  lightBlue,
  lightRed,
  ligthSalmon,
  slightlyTransparentWhite,
  snow,
  tumbleweed,
  whiteSmoke,
  greyNinety,
  lightRedTransparent,
  lightOrangeTransparent,
  lightGreenTransparent,
  redErrorLight,
} from "../constValues/appColors";

const lightTheme = {
  headerBg: tumbleweed,
  body: greyNinety,
  semiBody: "",
  mainContent: snow,
  title: ligthSalmon,
  subtitle: greyTwenty,
  text: "black",
  icon: greyTwenty,
  textError: redErrorLight,

  progressBarOutside: ligthSalmon,
  progressBarInside: lightBlue,

  mainTableHeader: gainsboro,
  mainTableRowBorder: greyEightyEight,
  mainTableExpandRow: gainsboro,
  mainTableRow: "white",
  mainTableRowHover: whiteSmoke,
  mainTableDrinkContent: greyNinety,

  secondaryTableRow: greyNinetyFive,
  secondaryTableRowHover: whiteSmoke,

  tableInputFocusedLabel: "black",
  tableInputUnderline: "grey",
  tableInputUnderLineFocused: "black",
  tableInputLabel: "grey",
  tableInputText: cadetBlue,

  modalColor: "white",
  modalBackDrop: slightlyTransparentWhite,

  dialogBackDropDanger: lightRedTransparent,
  dialogBackDropWarning: lightOrangeTransparent,
  dialogBackDropSuccess: lightGreenTransparent,

  paymentDialogInputRoot: "",
  paymentDialogInputHover: "",
  paymentDialogInput: "",

  dialogTextareaBorder: "black",
  dialogTextareaBorderHover: ligthSalmon,
  dialogTextareaBorderFocus: greyTwenty,
  dialogTextareaBgDanger: lightRed,
  dialogtextareaShadow: "grey",
  dialogtextareaShadowFocus: americanSilver,
};

export default lightTheme;
