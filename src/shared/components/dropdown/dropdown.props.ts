interface DropdownItem {
    label: string
    value: string | number
}

interface DropdownProps {
    label: string
    items: DropdownItem[]
    children: React.ReactNode
    onSelect: (value: string | number) => void
}