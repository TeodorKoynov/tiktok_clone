interface IProps {
    text: string;
}

const NoResults = ({text}: IProps) => {
    return (
        <div>No results</div>
    )
}

export default NoResults;