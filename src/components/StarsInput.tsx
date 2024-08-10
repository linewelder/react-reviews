import './StarsInput.css';

type StarsInputProps = {
    value: number,
    maxValue: number,
    onChanged?: (value: number) => void,
};

export default function StarsInput({ value, maxValue, onChanged }: StarsInputProps) {
    const handleClick = (val: number) => {
        if (onChanged) {
            onChanged(val);
        }
    };

    return (
        <div className="StarsInput">
            {[...Array(maxValue).keys()].map(i =>
                <span key={i} onClick={() => handleClick(i + 1)}>
                    {i + 1 <= value ? '★' : '☆'}
                </span>
            )}
        </div>
    );
}
