import {
  ChangeEvent,
  ComponentPropsWithRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { useMultipleRefs } from '../lib/useMultipleRefs'

interface ElasticTextareaProps extends ComponentPropsWithRef<'textarea'> {}

const ElasticTextarea = forwardRef<HTMLTextAreaElement, ElasticTextareaProps>(
  ({ className, defaultValue, onChange, ...otherProps }, ref) => {
    const [value, setValue] = useState(defaultValue ?? '')
    const textareaElementRef = useRef<HTMLTextAreaElement>(null)
    const ghostElementRef = useRef<HTMLDivElement>(null)
    const refs = useMultipleRefs(ref, textareaElementRef)

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value

      setValue(newValue)

      onChange?.(event)
    }

    useEffect(() => {
      const ghostElement = ghostElementRef.current
      const textareaElement = textareaElementRef.current

      if (ghostElement && textareaElement) {
        const { width, height } = ghostElement?.getBoundingClientRect()

        textareaElement.style.height = `${height}px`
        textareaElement.style.width = `${width}px`
      }
    }, [value])

    return (
      <div className="relative w-full [font-size:0]">
        <textarea
          className={twMerge('input', className)}
          ref={refs}
          rows={1}
          value={value}
          onChange={handleChange}
          {...otherProps}
        />

        <div
          className={twMerge(
            'opacity-0',
            'absolute top-0 left-0',
            'pointer-events-none',
            'text-base',
            'whitespace-pre-wrap',
          )}
          ref={ghostElementRef}
        >
          {value}{' '}
        </div>
      </div>
    )
  },
)

ElasticTextarea.displayName = 'ElasticTextarea'

export { ElasticTextarea }
