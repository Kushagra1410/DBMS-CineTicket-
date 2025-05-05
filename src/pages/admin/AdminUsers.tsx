import { useState } from 'react';
import { Search, Edit, Trash, UserPlus, Mail, Phone, Calendar } from 'lucide-react';

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock users data
  const users = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active', registeredDate: '2023-12-10', lastLogin: '2024-04-15' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Active', registeredDate: '2024-01-15', lastLogin: '2024-04-12' },
    { id: '3', name: 'Robert Johnson', email: 'robert.j@example.com', role: 'User', status: 'Inactive', registeredDate: '2024-02-20', lastLogin: '2024-03-05' },
    { id: '4', name: 'Emily Davis', email: 'emily.davis@example.com', role: 'User', status: 'Active', registeredDate: '2024-03-01', lastLogin: '2024-04-10' },
    { id: '5', name: 'Michael Wilson', email: 'michael.w@example.com', role: 'User', status: 'Active', registeredDate: '2024-03-15', lastLogin: '2024-04-14' },
  ];
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Users Management</h1>
        
        <button className="btn btn-primary flex items-center justify-center">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </button>
      </div>
      
      {/* Search and filters */}
      <div className="bg-muted-800/50 rounded-lg p-4 mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-400" />
          </div>
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 py-2 bg-muted-900 border border-muted-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      
      {/* Users Table */}
      <div className="bg-muted-800/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-muted-700">
            <thead className="bg-muted-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                  Registered Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-muted-800/30 divide-y divide-muted-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-900 flex items-center justify-center">
                        <span className="text-sm font-medium">{user.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-sm text-muted-400 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'Admin' 
                        ? 'bg-primary-900/20 text-primary-400' 
                        : 'bg-muted-700 text-muted-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'Active' 
                        ? 'bg-green-900/20 text-green-400' 
                        : 'bg-accent-900/20 text-accent-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-400" />
                      {new Date(user.registeredDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-400 hover:text-primary-300 mr-4">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-accent-500 hover:text-accent-400">
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}