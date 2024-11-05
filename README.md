### <u>Careful considerations:</U>

#### Buttons:
- Pill buttons will need their widths specifically defined within the MSO conditional statement AS WELL as the html element within.

- Pill buttons will ALSO need their hrefs changed on the anchor tag as well as the v:roundrect conditional element for Outlook clients

#### Lists:
Due to Outlook and Gmails differing approach to list rendering, consider composing lists as a series of elements written like so:

```
<p style="font-family: 'Helvetica Neue LT Std',Helvetica,sans-serif; font-size: 14px; font-weight: 400; margin: 0; vertical-align: middle; line-height: 24px;" class="list-item">
	<span class="bullet" style="font-size: 22px; color: #00539A; vertical-align: middle;">&bull;</span>&nbsp;
	Lazard US Offshore Fund Offerings
</p>
```

This allows the 'marker' for the list item to be colored correcly to the Figma file, while also avoiding the margin and spacing issues from Outlook

### <u>Required deviations from the Figma file:</U>
[Reference](https://www.figma.com/design/DQOzjDZf7trxfL4D9jg3Ox/New-Email-Library?t=2ABFyPpxE1ZTgt7E-0)

#### General Design Changes:
- Line heights have been converted from percentages, and rounded to nearest full pixel, as percentage values and fractional pixels can cause artifact lines to appear on Outlook clients

#### Color changes made due to lack of opacity support in email clients:
- Changed module frame border color from #171A1C to #dadada on "Parchment", "Sage", and "Clarity" variants
- Changed module frame border color from #FFFFFF to #296faa on "Sapphine" variant
- Changed module frame border color from #FFFFFF to #3c3f40 on "Onyx" variant
- Changed module frame border color from #FFFFFF to #6a7666 on "Currency" variant