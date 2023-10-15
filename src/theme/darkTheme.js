import {
  americanSilver,
  darkGreenTransparent,
  darkGrey,
  darkOrangeTransparent,
  darkRedTransparent,
  darkerGrey,
  dimGrey,
  greyEightyEight,
  greyNineteen,
  greyNinetyFive,
  greyThirtyOne,
  greyTwenty,
  greyTwentyFive,
  lightBlack,
  lightBlue,
  lightRed,
  ligthSalmon,
  paymentInputDark,
  paymentInputHoverDark,
  paymentInputRootDark,
  pinkRed,
  redErrorDark,
  slightylTransparentBlack,
  tumbleweed,
} from "../constValues/appColors";

const darkTheme = {
  headerBg: tumbleweed,
  body: greyTwentyFive,
  semiBody: greyNinetyFive,
  mainContent: lightBlack,
  title: pinkRed,
  subtitle: greyTwenty,
  text: "#fff",
  icon: greyTwenty,
  textError: redErrorDark,
  
  progressBarOutside: pinkRed,
  progressBarInside: lightBlue,
  
  mainTableHeader: greyNineteen,
  mainTableRowBorder: greyEightyEight,
  mainTableExpandRow: greyTwenty,
  mainTableRow: darkGrey,
  mainTableRowHover: greyThirtyOne,
  mainTableDrinkContent: greyNineteen,

  secondaryTableRow: dimGrey,
  secondaryTableRowHover: darkerGrey,

  tableInputFocusedLabel: "white",
  tableInputUnderline: greyNinetyFive,
  tableInputUnderLineFocused: "white",
  tableInputLabel: greyNinetyFive,
  tableInputText: pinkRed,

  modalColor: lightBlack,
  modalBackDrop: slightylTransparentBlack,

  dialogBackDropDanger: darkRedTransparent,
  dialogBackDropWarning: darkOrangeTransparent,
  dialogBackDropSuccess: darkGreenTransparent,

  paymentDialogInputRoot: paymentInputRootDark,
  paymentDialogInputHover: paymentInputHoverDark,
  paymentDialogInput: paymentInputDark,

  dialogTextareaBorder: "black",
  dialogTextareaBorderHover: ligthSalmon,
  dialogTextareaBorderFocus: greyTwenty,
  dialogTextareaBgDanger: lightRed,
  dialogtextareaShadow: darkGrey,
  dialogtextareaShadowFocus: americanSilver,
};

export default darkTheme;
