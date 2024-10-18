### <u>Careful considerations:</U>
- Pill buttons in Outlook will need their widths specifically defined within the MSO conditional statement. Most other clients the size of the button will be determined by it's text content.

### <u>Required deviations from the Figma file:</U>
[Reference](https://www.figma.com/design/DQOzjDZf7trxfL4D9jg3Ox/New-Email-Library?t=2ABFyPpxE1ZTgt7E-0)

#### General Changes:
- Unordered List bullets do not have their color changed to Sapphire in some clients due to limited support for the ::marker pseudo selector as well as list-style: none not being applied in Outlook

#### Color changes made due to lack of opacity support in email clients:
- Changed module frame border color from #171A1C to #dadada on "Parchment", "Sage", and "Clarity" variants
- Changed module frame border color from #FFFFFF to #296faa on "Sapphine" variant
- Changed module frame border color from #FFFFFF to #3c3f40 on "Onyx" variant
- Changed module frame border color from #FFFFFF to #6a7666 on "Currency" variant