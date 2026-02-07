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
      sheet.appendRow([
        'Timestamp',
        'Action',
        'Category',
        'Label',
        'Page URL',
        'User Agent',
        'Session ID'
      ]);
    }

    // Append the event data
    sheet.appendRow([
      new Date().toISOString(),
      data.action || '',
      data.category || '',
      data.label || '',
      data.page_url || '',
      data.user_agent || '',
      data.session_id || ''
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
    .createTextOutput(JSON.stringify({ status: 'Event Logger Active' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function - run this to verify the script works
function testAppendRow() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date().toISOString(),
    'test_click',
    'test_category',
    'Test Button',
    'https://heisslounge.com',
    'Test User Agent',
    'test-session-123'
  ]);
}
