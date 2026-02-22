import React from 'react'
import {Text, TextArea, TextInput, Flex, Stack} from '@sanity/ui'
import {set, unset} from 'sanity'

/**
 * Custom input component with character counter for SEO fields
 * Supports both title (65 chars) and description (155 chars) fields
 */
export function CharacterCounterInput(props: any) {
  const {schemaType, value, onChange, path} = props
  const currentLength = value?.length || 0

  // Determine max length based on field name
  const isTitle = path?.includes('seoTitle')
  const MAX_LENGTH = isTitle ? 65 : 155
  const WARNING_THRESHOLD = isTitle ? 55 : 140 // Start showing warning near limit

  const isOverLimit = currentLength > MAX_LENGTH
  const isNearLimit = currentLength >= WARNING_THRESHOLD && currentLength <= MAX_LENGTH

  const applyValue = (newValue: string) => {
    if (newValue) {
      onChange(set(newValue))
    } else {
      onChange(unset())
    }
  }

  const handleTextAreaChange: React.FormEventHandler<HTMLTextAreaElement> = (event) => {
    applyValue(event.currentTarget.value)
  }

  const handleInputChange: React.FormEventHandler<HTMLInputElement> = (event) => {
    applyValue(event.currentTarget.value)
  }

  // Check if this should be a textarea - rows can be in schemaType directly or in options
  const isTextarea =
    schemaType.type === 'text' || schemaType.rows !== undefined || schemaType.options?.rows !== undefined
  const rows = schemaType.rows || schemaType.options?.rows || 3

  return (
    <Stack space={2}>
      {isTextarea ? (
        <TextArea
          value={value || ''}
          onChange={handleTextAreaChange}
          rows={rows}
          placeholder={schemaType.placeholder}
        />
      ) : (
        <TextInput value={value || ''} onChange={handleInputChange} placeholder={schemaType.placeholder} />
      )}
      <Flex align="center" justify="flex-end" gap={2}>
        <Text
          size={1}
          weight={isOverLimit || isNearLimit ? 'semibold' : 'regular'}
          style={{
            color: isOverLimit
              ? 'var(--card-critical-fg-color)'
              : isNearLimit
                ? 'var(--card-caution-fg-color)'
                : 'var(--card-positive-fg-color)',
            whiteSpace: 'nowrap',
          }}
        >
          {currentLength} / {MAX_LENGTH}
          {isOverLimit && ' (over limit)'}
        </Text>
      </Flex>
    </Stack>
  )
}

