export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4"
           style={{
             borderColor: '#14919B transparent #E2F163 transparent',
           }}
      ></div>
    </div>
  );
}
