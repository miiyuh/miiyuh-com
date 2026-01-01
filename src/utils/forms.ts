import type { FormDocument } from '@/types/forms'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

/**
 * Fetch a single survey by ID
 */
export async function getFormById(formId: string): Promise<FormDocument | null> {
  try {
    const response = await fetch(`${PAYLOAD_URL}/api/surveys/${formId}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching survey:', error)
    return null
  }
}

/**
 * Fetch a survey by its title/slug
 */
export async function getFormByTitle(title: string): Promise<FormDocument | null> {
  try {
    const response = await fetch(
      `${PAYLOAD_URL}/api/surveys?where[title][equals]=${encodeURIComponent(title)}&limit=1`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching survey by title:', error)
    return null
  }
}

/**
 * Fetch all available surveys
 */
export async function getAllForms(): Promise<FormDocument[]> {
  try {
    const response = await fetch(`${PAYLOAD_URL}/api/surveys?limit=100`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching surveys:', error)
    return []
  }
}

/**
 * Submit survey response to Payload
 */
export async function submitForm(
  formId: string,
  submissionData: Array<{ field: string; value: string }>
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${PAYLOAD_URL}/api/survey-responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form: formId,
        submissionData,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        error: errorData.message || 'Failed to submit survey',
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}
