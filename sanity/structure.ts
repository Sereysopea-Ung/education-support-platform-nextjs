import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('user').title('Users'),
      S.documentTypeListItem('post').title('Posts'),
        S.documentTypeListItem('comment').title('Comments'),
        S.documentTypeListItem('scholarship').title('Scholarship'),
        S.documentTypeListItem('job').title('Job'),
        S.documentTypeListItem('news').title('News'),
        S.documentTypeListItem('feedback').title('Feedback')
    ])
