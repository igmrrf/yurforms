import { FormField } from "@/types/forms"
import { FormAnalyzer } from "./formAnalyzer"

export class FormDetector {
  static observe(targetNode: HTMLElement, callback: (fields: FormField[]) => void) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const forms = this.detectForms(targetNode)
          if (forms.length > 0) {
            callback(this.analyzeForms(forms))
          }
        }
      })
    })

    observer.observe(targetNode, {
      childList: true,
      subtree: true
    })

    return observer
  }

  private static detectForms(node: HTMLElement): HTMLFormElement[] {
    return Array.from(node.getElementsByTagName('form'))
  }

  private static analyzeForms(forms: HTMLFormElement[]): FormField[] {
    const fields: FormField[] = []

    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, select, textarea')
      inputs.forEach(input => {
        const label = this.findLabel(input)
        if (label) {
          const attributes = this.getElementAttributes(input)
          fields.push(FormAnalyzer.analyzeField(label, attributes))
        }
      })
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