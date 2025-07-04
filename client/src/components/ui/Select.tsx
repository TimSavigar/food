import * as React from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface SelectOption<T> {
  value: T
  label: string
}

export interface SelectProps<T> {
  value: T
  onChange: (value: T) => void
  options: SelectOption<T>[]
  placeholder?: string
  className?: string
}

export function Select<T extends unknown>({ value, onChange, options, placeholder, className }: SelectProps<T>) {
  const selected = options.find(o => o.value === value)
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }: { open: boolean }) => (
        <div className={cn('relative', className)}>
          <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
            <span className="block truncate">{selected ? selected.label : placeholder}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={String(option.value)}
                  className={({ active }: { active: boolean }) => cn('relative cursor-pointer select-none py-2 pl-10 pr-4', active ? 'bg-orange-100 text-orange-900' : 'text-gray-900')}
                  value={option.value}
                >
                  {({ selected }: { selected: boolean }) => (
                    <>
                      <span className={cn('block truncate', selected && 'font-medium')}>{option.label}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}