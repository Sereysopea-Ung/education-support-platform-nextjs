import {type SchemaTypeDefinition} from 'sanity'
import {userType} from './userType'
import {postType} from './postType'
import {commentType} from './commentType'
import {jobType} from './jobType'
import {scholarshipType} from './scholarshipType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType,postType,commentType,jobType,scholarshipType],
}
