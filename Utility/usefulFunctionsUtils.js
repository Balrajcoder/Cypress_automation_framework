class UsefulFunctionsUtils {
    /**
     * Formats a given amount into a currency string with a rupee symbol (₹)
     * and comma-separated thousands for readability.
     *
     * Example:
     * - Input: 1234567
     * - Output: "₹1,234,567"
     *
     * Handles negative amounts by taking the absolute value of the input.
     *
     * @param {number} amount - The numerical amount to be formatted.
     * @returns {string} - The formatted currency string.
     **/
    formatAmount(amount) {
        return `₹${Math.abs(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }

    /**
     * Validates whether a given date-time string matches the specified format.
     *
     * The expected format is:
     * - Day (1 or 2 digits)
     * - Month (3-letter abbreviation, e.g., Jan, Feb)
     * - Time (1 or 2 digits for hours, followed by ':' and 2 digits for minutes)
     * - Period (AM or PM)
     *
     * Example of valid inputs:
     * - "1 Jan, 2:30 PM"
     * - "12 Dec, 12:00 AM"
     *
     * @param {string} dateTimeString - The date-time string to validate.
     * @returns {boolean} - Returns true if the string matches the expected format, otherwise false.
     **/
    isValidDateTime(dateTimeString) {
        const dateTimeRegex = /^\d{1,2} \w{3}, \d{1,2}:\d{2} (AM|PM)$/;
        return dateTimeRegex.test(dateTimeString);
    }

    /**
     * Checks if a given date-time string matches the expected format.
     *
     * The required format is:
     * - Day (2 digits, e.g., 01-31)
     * - Month (2 digits, e.g., 01-12)
     * - Year (4 digits, e.g., 2025)
     * - Separator (`|`) between date and time
     * - Time in 24-hour format (2 digits for hours, followed by ':' and 2 digits for minutes and seconds)
     * - Period (AM or PM)
     *
     * Example of valid inputs:
     * - "27/02/2025 | 13:39:01 PM"
     * - "01/12/2024 | 08:15:45 AM"
     *
     * @param {string} dateTimeString - The date-time string to validate.
     * @returns {boolean} - Returns true if the string matches the expected format, otherwise false.
     **/
    validateDateTimeFormat(dateTimeString) {
        const dateTimeRegex = /^\d{2}\/\d{2}\/\d{4} \| \d{2}:\d{2}:\d{2} (AM|PM)$/;
        return dateTimeRegex.test(dateTimeString);
    }

    /**
     * Cleans and converts a formatted currency string into a numerical string with 2 decimal places.
     *
     * This function removes the rupee symbol (₹) and any commas from the input string, trims whitespace,
     * and converts the resulting value to a number formatted with two decimal places.
     *
     * Example:
     * - Input: " ₹1,234.56 "
     * - Output: "1234.56"
     *
     * @param {string} amountString - The formatted currency string to clean and convert.
     * @returns {string} - The cleaned numerical string with two decimal places.
     **/
    cleanFormattedAmount(amountString) {
        const cleanedAmount = amountString
            .trim()
            .replace(/[₹,]/g, '');    // Remove ₹ and commas
        return parseFloat(cleanedAmount).toFixed(2);   // Converts to a number with 2 decimal places
    }
}

export default new UsefulFunctionsUtils();