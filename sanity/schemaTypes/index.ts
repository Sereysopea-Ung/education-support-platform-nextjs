import {type SchemaTypeDefinition} from 'sanity'
import {userType} from './userType'
import {postType} from './postType'
import {commentType} from './commentType'
import {jobType} from './jobType'
import {scholarshipType} from './scholarshipType'
import {newsType} from "@/sanity/schemaTypes/newsType";
import {feedbackType} from './feedbackType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, postType, commentType, jobType, scholarshipType, newsType, feedbackType],
}
