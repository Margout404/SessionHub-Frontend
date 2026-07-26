type MyButtonProps = {
    text: string;
};

function MyButton({ text }: MyButtonProps) {
    return (
        <button>
            {text}
        </button>
    );
}

export default MyButton;