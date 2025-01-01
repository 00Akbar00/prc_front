"use client";
import React from 'react';
import Table from '../../components/hr/table/table';
import { styles } from '@/components/hr/table/tableStyle';
import LogoutButton from '../../components/logoutButton'

const HrDash = () => {
  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <h1 style={styles.tableTitle}>HR Dashboard</h1>
        <div style={styles.logoutButtonContainer}>
          <LogoutButton style={styles.logoutButton} hoverStyle={styles.logoutButtonHover} />
        </div>
        <Table style={styles} />
      </div>
    </div>
  );
};
export default HrDash;
