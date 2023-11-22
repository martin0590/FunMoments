import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";

const AllUsers = () => {
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();
  const { toast } = useToast();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return (
      <p>There was an error fetching users.</p>
    )
  }

  return (
    <div className="common-container">
      <div className="user-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/people.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
      </div>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
