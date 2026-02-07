// ===========================================
// Google Apps Script - Copy this to your Google Sheet
// Extensions > Apps Script > Paste this code
// ===========================================

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date', 'Event']);
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 2);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#c9a962');
    }

    // Append the event data (only Date and Event)
    sheet.appendRow([
      data.date || new Date().toLocaleString('de-DE'),
      data.event || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Heiss Lounge Event Logger Active' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function - run this to verify the script works
function testAppendRow() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'Event']);
  }

  // Add test row
  sheet.appendRow([
    new Date().toLocaleString('de-DE'),
    'Test Event'
  ]);
}

// Clear all data (use carefully!)
function clearSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  sheet.appendRow(['Date', 'Event']);
  const headerRange = sheet.getRange(1, 1, 1, 2);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#c9a962');
}
