const FriendsLogo = ({ className }) => {
    return (
        <div className={`text-xl font-bold mt-2 text-violet-400 flex flex-row items-center justify-center
        ${className}`}>
            <span>
                frAInds
            </span>
            <span className="text-[2.6rem] mb-3">
                ●
            </span>
        </div>
    )
}

export default FriendsLogo;