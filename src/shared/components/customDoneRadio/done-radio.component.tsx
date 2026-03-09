export default function DoneRadio({ value, onChange }: DoneRadioProps) {
    return (
        <div className="flex gap-6">

            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="done"
                    checked={value}
                    onChange={() => onChange(true)}
                />
                Done
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="done"
                    checked={!value}
                    onChange={() => onChange(false)}
                />
                Pending
            </label>

        </div>
    )
}