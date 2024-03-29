// header의 사용방법 눌렀을 때 나오는 반투명 검은색 사용설명서
const UsageModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-black text-white p-5 rounded-lg w-2/5 h-[600px] mx-auto">
                <div className="flex flex-col min-h-full text-center">
                    <p className="text-center text-3xl mb-12">사용설명서</p>
                    <p className="mb-6">
                        1. 캐릭터를 선택해주세요.
                    </p>
                    <p className="">
                        2. 각 캐릭터는 고유 능력이 있습니다.
                    </p>
                    <p className="mb-6">
                        캐릭터에게 질문해보세요.
                    </p>
                    <p className="mb-6">
                        3. 유태민 죽어
                    </p>
                    <p className="">
                        4. 건의사항 및 캐릭터 추가는                  
                    </p>
                    <p>
                        제작자에게 문의해주세요.  
                    </p>
                </div>

                <button
                onClick={onClose}
                className="absolute bottom-[96px] left-1/2 transform -translate-x-1/2 py-2 px-4 bg-red-500 hover:bg-red-800 text-white font-bold rounded">
                    X
                </button>
            </div>
        </div>
    );
};
export default UsageModal;
