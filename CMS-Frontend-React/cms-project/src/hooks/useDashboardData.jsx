// src/hooks/useDashboardData.jsx
import { useState, useEffect } from 'react';

export default function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data response
        const data = {
          stats: {
            totalCauses: 27,
            activeCauses: 18,
            totalDonations: "$148,750",
            monthlyGrowth: "12%"
          },
          recentCauses: [
            { id: 1, name: "Clean Ocean Initiative", status: "Active", donations: "$12,450", date: "2025-04-15" },
            { id: 2, name: "Reforestation Project", status: "Active", donations: "$8,320", date: "2025-04-12" },
            { id: 3, name: "Wildlife Protection", status: "Inactive", donations: "$5,780", date: "2025-04-08" },
            { id: 4, name: "Education for All", status: "Active", donations: "$15,200", date: "2025-04-05" }
          ],
          notifications: [
            { id: 1, type: "success", message: "New donation of $500 received for Clean Ocean Initiative", time: "10 minutes ago" },
            { id: 2, type: "info", message: "Wildlife Protection cause has been updated", time: "1 hour ago" },
            { id: 3, type: "warning", message: "Education for All cause needs more volunteers", time: "2 hours ago" },
            { id: 4, type: "error", message: "Payment processing error detected", time: "3 hours ago" }
          ]
        };
        
        setDashboardData(data);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { isLoading, dashboardData, error };
}