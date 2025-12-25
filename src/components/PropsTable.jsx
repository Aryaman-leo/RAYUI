const PropsTable = ({ props }) => {
  return (
    <div className="overflow-x-auto my-6">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden border border-[#e0e0e6] rounded-lg">
          <table className="min-w-full divide-y divide-[#e0e0e6]">
            <thead className="bg-[#f9f9fb]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1b1b1b] uppercase tracking-wider">
                  Prop
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1b1b1b] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1b1b1b] uppercase tracking-wider">
                  Default
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1b1b1b] uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#e0e0e6]">
              {props.map((prop, index) => (
                <tr key={index} className="hover:bg-[#f9f9fb] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm font-mono text-[#0069c2] bg-[#f0f7ff] px-2 py-1 rounded">
                      {prop.name}
                    </code>
                    {prop.required && (
                      <span className="ml-2 text-xs text-[#dc2626] font-medium">required</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm font-mono text-[#4e4e4e]">
                      {prop.type}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    {prop.default ? (
                      <code className="text-sm font-mono text-[#4e4e4e] bg-[#f9f9fb] px-2 py-1 rounded">
                        {prop.default}
                      </code>
                    ) : (
                      <span className="text-sm text-[#9ca3af]">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#4e4e4e]">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropsTable;

