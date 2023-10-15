function formatNumberLocalization(number, seperator) {
    const parts = number.toString().split('.');
    parts[1] = parts[1] || '00'; // Adding zeros if no decimal part
    return parts.join(seperator);
}

export default formatNumberLocalization;
