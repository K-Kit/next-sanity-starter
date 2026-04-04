'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {assist} from '@sanity/assist'

import {apiVersion, dataset, projectId} from '@/sanity/env'
import {schema} from '@/sanity/schemaTypes'
import {structure} from '@/sanity/desk-structure'
import {resolve} from '@/sanity/resolve'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    assist(),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
