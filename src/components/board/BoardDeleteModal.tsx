import Modal from "@/components/@shared/modal/Modal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteArticles} from "@/libs/axios/board/deleteArticles";
import {useRouter} from "next/router";

export interface BoardDeleteModalProps {
  id: number | undefined;
  isOpen: boolean;
  onClick: () => void;
}

export default function BoardDeleteModal({id, isOpen, onClick}: BoardDeleteModalProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 게시글 삭제를 위한 deleteMutation
  // 게시글 삭제 성공 후, 베스트 게시글과 게시글의 쿼리를 다시 불러와서 화면을 재렌더링
  const deleteMutation = useMutation({
    mutationFn: () => deleteArticles(id),
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['articles']});
        await queryClient.invalidateQueries({ queryKey: ['likes']});
        router?.push("/board")
      } catch (e) {
        console.error(e);
      }
    }
  })

  // 게시글 삭제를 전달하기 위한 이벤트 핸들러
  const handleSubmit = () => {
    deleteMutation.mutate();
    onClick();
  };

  return (
    <>
      {isOpen && (
        <Modal onClick={onClick} modalFrameClassNames="">
          <form onSubmit={handleSubmit}>
            <div className="px-4 pt-4">
              <p className="font-bold text-[20px] leading-6 text-brand-white">게시글을 삭제하시겠습니까?</p>
              <div className="mt-4 grid-cols-2 grid gap-2">
                <button type="submit"
                        className="py-4 rounded-xl hover:bg-brand-black-dark border-[1px] border-solid border-brand-black-light">
                  예
                </button>
                <button onClick={onClick}
                        className="py-4 rounded-xl hover:bg-brand-black-dark border-[1px] border-solid border-brand-black-light">
                  아니오
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}