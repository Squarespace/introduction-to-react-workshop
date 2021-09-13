## 10 Edit Profiles

In this step, the code we are writing is within these files:
`src/components/ProfileGrid.js`
`src/components/ProfileForm.js`
`src/providers/ProfileProvider.js`

In this step we are adding an edit button to the profile cards
within the grid. On click, they will on the same modal we use to
create profiles, prepopulated with the data from the selected
profile card. On submit, it will update the json-server database
with the new changes to the profile. We are also keeping track of
the `selectedProfileIndex` within context for reference to which
profile we are editing.
