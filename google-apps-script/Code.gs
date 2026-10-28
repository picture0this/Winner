// Winner email backend for the GitHub Pages site.
// Paste into https://script.google.com while signed in as lightningteam03@gmail.com,
// then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
const MAIL_TO = 'omar4photos@gmail.com';

function doPost(e) {
  let data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) { }

  // Collapse control characters / newlines so the mail body stays one clean line.
  const clean = v => String(v || '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();
  const name = clean(data.name);
  const studentId = clean(data.studentId);

  if (!name || !studentId || name.length > 100 || studentId.length > 50) {
    return json({ ok: false, error: 'invalid' });
  }

  try {
    MailApp.sendEmail({
      to: MAIL_TO,
      subject: 'Winner',
      body: `the winner is "${name}" and the winner Student id: "${studentId}"`,
      name: 'Winner Website'
    });
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: 'mail' });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
