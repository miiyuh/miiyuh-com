'use client'

import { useCallback } from 'react'
import { Button, useField, useListDrawer } from '@payloadcms/ui'
import { Images } from '@phosphor-icons/react'

type ImageRow = {
  image: string
  title?: string
  description?: string
}

export default function GalleryBulkAddImagesButton() {
  const { value, setValue } = useField<ImageRow[]>()

  const [ListDrawer, , { closeDrawer, openDrawer }] = useListDrawer({
    collectionSlugs: ['media'],
  })

  const handleBulkSelect = useCallback(
    (selected: Map<number | string, boolean>) => {
      const selectedIds: string[] = []
      for (const [id, isSelected] of selected) {
        if (isSelected) selectedIds.push(String(id))
      }

      if (selectedIds.length > 0) {
        const newRows: ImageRow[] = selectedIds.map((id) => ({ image: id }))
        setValue([...(value ?? []), ...newRows])
      }

      closeDrawer()
    },
    [value, setValue, closeDrawer],
  )

  return (
    <div style={{ marginBottom: 'calc(var(--base) / 2)' }}>
      <Button
        buttonStyle="secondary"
        size="small"
        type="button"
        className="gallery-bulk-add-btn"
        onClick={() => openDrawer()}
        icon={<Images size={16} />}
        iconPosition="left"
      >
        Bulk add from media library
      </Button>
      <ListDrawer enableRowSelections onBulkSelect={handleBulkSelect} />
    </div>
  )
}
