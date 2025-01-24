import { FormField } from "@/types/forms"
import { FormAnalyzer } from "./formAnalyzer"
import { FormAnalysisError } from "@/types/errors"
import { DEFAULT_PATTERNS } from "@/config/constants"

export class FormDetector {
  static observe(targetNode: HTMLElement, callback: (fields: FormField[]) => void) {
    try {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            try {
              const forms = this.detectForms(targetNode)
              if (forms.length > 0) {
                callback(this.analyzeForms(forms))
              }
            } catch (error) {
              throw new FormAnalysisError('Failed to analyze forms', error)
            }
          }
        })
      })

      observer.observe(targetNode, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['value', 'type']
      })

      return observer
    } catch (error) {
      throw new FormAnalysisError('Failed to initialize form detection', error)
    }
  }

  private static detectForms(node: HTMLElement): HTMLFormElement[] {
    try {
      return Array.from(node.getElementsByTagName('form'))
    } catch (error) {
      throw new FormAnalysisError('Failed to detect forms', error)
    }
  }

  private static analyzeForms(forms: HTMLFormElement[]): FormField[] {
    const fields: FormField[] = []

    forms.forEach(form => {
      try {
        const inputs = form.querySelectorAll('input, select, textarea')
        inputs.forEach(async input => {
          const label = this.findLabel(input)
          if (label) {
            const attributes = this.getElementAttributes(input)
            fields.push(await FormAnalyzer.analyzeField(label, attributes))
          }
        })
      } catch (error) {
        console.error('Error analyzing form:', error)
      }
    })

    return fields
  }

  private static findLabel(element: Element): string | null {
    const id = element.getAttribute('id')
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`)
      if (label) return label.textContent
    }

    const parentLabel = element.closest('label')
    if (parentLabel) return parentLabel.textContent

    return element.getAttribute('placeholder') || element.getAttribute('name')
  }

  private static getElementAttributes(element: Element): Record<string, string> {
    const attributes: Record<string, string> = {}
    element.getAttributeNames().forEach(name => {
      attributes[name] = element.getAttribute(name) || ''
    })
    return attributes
  }
}
